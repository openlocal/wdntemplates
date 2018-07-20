let notices = document.querySelectorAll('[data-widget="notice"]');1111
let fixedBottomExists = false; // flag for checking if a fixed bottom has been initialized on the page
fixedBottomExists = document.querySelector('[id*="unl-widget-fixedBottom-"]') ? true : false; // if a fixedBottom notice has been previously added to the page set flag to true


notices = [].slice.call(notices);

// standard classes based on what kind of notice, keep it to DCF classes for now
const noticeClasses  = {
	notify: ['dcf-notice', 'unl-notice-notify'],
	success: ['dcf-notice', 'unl-notice-success'],
	alert: ['dcf-notice', 'unl-notice--alert'],
	fatal: ['dcf-notice', 'unl-notice--fatal'],
};

const noticeLocationClasses = {
	current: ['uno'],
	nav: ['foo'],
	fixedBottom:['bar', 'dcf-fixed', 'dcf-notice-fixedBottom', 'dcf-pin-bottom', 'dcf-pin-right', 'dcf-pin-left'],
	fixedBottomLeft:['bar', 'dcf-fixed', 'dcf-pt-8', 'dcf-pin-bottom', 'dcf-pin-right']
};

// default animations depending on associated locations
// fixedBottom associated with slideUp animation. Everything else uses slideInScroll
const noticeAnimationClasses = {
	slideInScroll: ['baz'],
	slideUp: ['car'],
};

const closeButtonClasses = ['dcf-absolute', 'dcf-pin-top', 'dcf-pin-right', 'dcf-mt-3', 'dcf-mr-3' ,'dcf-btn', 'dcf-btn-tertiary', 'js-notice-toggle'];

/**
 *
 * Functions
 */
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

// move element to be first child of main
function moveElement(el) {
	const main = document.querySelector('main');
	const firstChild = main.firstElementChild;
	main.insertBefore(el, firstChild);
}

function closeNotice(notice) {
	notice.classList.add('dcf-notice-fixedBottom--close');
	notice.addEventListener('transitionend', e => {
		if (e.propertyName !== "max-height") return;
		el.classList.add('dcf-d-none');
		el.setAttribute('aria-hidden', 'true');
		console.log(e);
	});
	localStorage.setItem(notice.id,'closed');
}

// collapse message when collapse button is selected
function collapseExpandMessage(el, closeButton, title, message) {
	const currentState = closeButton.getAttribute('aria-expanded') === "true" ? true : false;
	const newState = !currentState;

	closeButton.setAttribute('aria-expanded', newState);

	if (currentState) {
		// if expanded, collapse message
		closeButton.innerText = "Expand";
		message.classList.add('dcf-notice_message--collapse');
		title.classList.add('dcf-notice_title--collapse');

		localStorage.setItem(el.id, 'collapsed');
	} else {
		// if collapse, expand message
		closeButton.innerText = "Collapse";
		message.classList.remove('dcf-notice_message--collapse');
		title.classList.remove('dcf-notice_title--collapse');

		localStorage.setItem(el.id, 'expanded');
	}
}

// add a close button to the widget
function addCloseButton(el, isCollapsible) {
	const closeButton = document.createElement('button');
	closeButtonClasses.forEach(closeButtonclass => closeButton.classList.add(closeButtonclass));

	if (isCollapsible) {
		// if notice can be collapsed
		const noticeTitle = el.querySelector('.js-notice-title');
		const noticeMessage = el.querySelector('.js-notice-message');
		const noticeMessageId = uuidv4();

		closeButton.innerText = 'collapse';
		closeButton.setAttribute('aria-expanded', 'true');

		if (noticeTitle) {
			noticeMessage.classList.add('dcf-notice__title');
		}

		if (noticeMessage) {
			closeButton.setAttribute('aria-controls', noticeMessageId);
			noticeMessage.classList.add('dcf-notice__message');
			noticeMessage.id = noticeMessageId;
		}

		closeButton.addEventListener('click', () => {
			collapseExpandMessage(el, closeButton, noticeTitle, noticeMessage);
		});

	} else {
		// else close the notice out completely
		closeButton.innerText = 'close';
		closeButton.addEventListener('click', () => {
			closeNotice(el);
		});
	}

	el.insertBefore(closeButton, el.firstElementChild);
}




/**
* Intersection Observer related code
*/

// intersection observer - one time drawing variables and functions
let isDrawn = false;
let isMobile = false;
let mobileObserver, desktopObserver;
const mq = window.matchMedia("(min-width: 480px)");
const mobileConfig = {
	/* on mobile given potential line breaks, we won't be able to view the entire notice in its
	 entirety at one go so might want to show the notice when close to half of it is shown */
	root: null,
	rootMargin: '0px',
	threshold: 0.65
};
const desktopConfig = {
	root: null,
	rootMargin: '0px',
	threshold: 0.8
};

function observerCallback(entries, observer) {
	entries.forEach(entry => {
		console.log(entry.intersectionRatio, entry.isIntersecting, observer, entry.boundingClientRect);

		if (entry.isIntersecting) {
			if(entry.intersectionRatio > 0 && entry.intersectionRatio >= observer.thresholds[0]) {
				console.log('START DRAWING!!!!!');
				noticeAnimationClasses.slideInScroll.forEach(noticeAnimationClass => entry.target.classList.add(noticeAnimationClass));

				// need to set isDrawn to true after drawn and disconnect observer
				//observer.disconnect();
				isDrawn = true;
				observer.disconnect();
			}
		}
	});
}

function onWidthChange(mq) {
	if (isDrawn) return;
	if (mq.matches) {
		//desktop
		isMobile = false;
		createDesktopObserver();

		if (mobileObserver){
			mobileObserver.disconnect();
		}
	} else {
		//mobile
		isMobile = true;
		createMobileObserver();

		if (desktopObserver){
			desktopObserver.disconnect();
		}
	}
}

function createMobileObserver() {
	notices.forEach(notice => {
		mobileObserver = new IntersectionObserver(observerCallback, mobileConfig);
		mobileObserver.observe(notice);
	});
}

function createDesktopObserver() {
	notices.forEach(notice => {
		desktopObserver = new IntersectionObserver(observerCallback, desktopConfig);
		desktopObserver.observe(notice);
	});
}





/**
 * Notice widget related code
 */

notices.forEach(notice => {
	if (notice.initialized) return; // exit if the notice has been initialized

	const noticeType = notice.dataset.noticeType;
	const noticeLocation = notice.dataset.location;
	const noticeAnimation = notice.dataset.animation === "true" ? true : false;
	const noticeCollapsible = notice.dataset.collapsible === "true" ? true : false;

	// 1.check notice option type and add the needed classes
	if (noticeClasses[noticeType]) {
		noticeClasses[noticeType].forEach(noticeClass => notice.classList.add(noticeClass))
	}

	// 2.check widget location whether its current, nav, or fixed-bottom and assign class names
	if (noticeLocation === 'fixedBottom') {
		if (!fixedBottomExists) {
			// get provided id and append it with a prefix
			if (notice.id) {
				notice.id = `unl-widget-fixedBottom--${notice.id}`;
			} else {
				console.error('An id attribute needs to be provided for the fixed to bottom notice to function properly with' +
						' localStorage');
			}

			// check to see if its data-collapsible is false and exists in storage as closed, close notice and exit right away
			if (!noticeCollapsible && localStorage.getItem(notice.id) === 'closed') {
				closeNotice(notice);
				return;
			}

			// add assigned classes
			if (noticeLocationClasses[noticeLocation]) {
				noticeLocationClasses[noticeLocation].forEach(noticeLocationClass => notice.classList.add(noticeLocationClass));
			}

			addCloseButton(notice, noticeCollapsible);

			fixedBottomExists = true;
		} else {
			console.error('Only one fixed to bottom notice may exist on a page');
		}

	} else {
			if (noticeLocationClasses[noticeLocation]) {
				noticeLocationClasses[noticeLocation].forEach(noticeLocationClass => notice.classList.add(noticeLocationClass));
			}
			// 2.1 if its nav, move the element to after the nav and before the page title
			if (noticeLocation === 'nav') {
				moveElement(notice);
			}
	}

	// 3. check animation type whether its slide-in-scroll?
	// if exist will have to implement intersection observer
	// Question for Michael if multiple widgets need intersection observer, how can we make it more modular?
	if (noticeAnimation) {
		if (noticeLocation === 'fixedBottom') {
			// add noticeAnimationClasses.slideUp
			noticeAnimationClasses.slideUp.forEach(noticeAnimationClass => notice.classList.add(noticeAnimationClass))
		} else {
			// implement intersection observer
			// add noticeAnimationClasses.slideInScroll
			if ('IntersectionObserver' in window) {
				notice.classList.add('hide-animate');
				mq.addListener(() => onWidthChange(mq));

				//check browser width once on page load
				onWidthChange(mq);
			}
		}
	}

		notice.initialized = true;

	// 4. check localStorage for fixed bottom and collapsible
	if (noticeCollapsible && localStorage.getItem(notice.id) === 'collapsed') {
		const noticeTitle = notice.querySelector('.js-notice-title');
		const noticeMessage = notice.querySelector('.js-notice-message');
		const toggleButton = notice.querySelector('.js-notice-toggle');
		collapseExpandMessage(notice, toggleButton,noticeTitle, noticeMessage);
	}

	console.dir(notice);
});
