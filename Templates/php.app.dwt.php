<?php
function wdnInclude($path)
{
  $documentRoot = 'https://unlcms.unl.edu';
  return readfile($documentRoot . $path);
}
?>
<!DOCTYPE html>
<html class="dcf-no-js dcf-no-webp" lang="en">
<head>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/head-1.html"); ?>
    <!--
      Membership and regular participation in the University of Nebraska–Lincoln (UNL) Web Developer Network (WDN) is required to use the UNLedu Web Framework. Visit the WDN site at https://wdn.unl.edu/. Register for our mailing list and add your site or server to UNL Web Audit.
      All framework code is the property of the UNL Web Developer Network. The code seen in a source code view is not, and may not be used as, a template. You may not use this code, a reverse-engineered version of this code, or its associated visual presentation in whole or in part to create a derivative work.
      This message may not be removed from any pages based on the UNLedu Web Framework.

      $Id$
    -->
    <!-- TemplateBeginEditable name="doctitle" -->
    <title>App Sub-Theme</title>
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/head-2.html"); ?>
    <!-- TemplateBeginEditable name="head" -->
    <!-- Place optional header elements here -->
    <!-- TemplateEndEditable -->
    <!-- TemplateParam name="class" type="text" value="" -->
</head>
<body class="@@(_document['class'])@@ unl app" data-version="$HTML_VERSION$">
<?php wdnInclude("/wdn/templates_5.1/includes/global/skip-nav.html"); ?>
<header class="dcf-header" id="dcf-header" role="banner">
    <?php wdnInclude("/wdn/templates_5.1/includes/global/header-global-1.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-global-1.html"); ?>
        <?php wdnInclude("/wdn/templates_5.1/includes/global/visit-global-1.html"); ?>
        <!-- TemplateBeginEditable name="visitlocal" -->
        <?php wdnInclude("/wdn/templates_5.1/includes/local/visit-local.html"); ?>
        <!-- TemplateEndEditable -->
        <?php wdnInclude("/wdn/templates_5.1/includes/global/visit-global-2.html"); ?>
        <?php wdnInclude("/wdn/templates_5.1/includes/global/apply-global-1.html"); ?>
        <!-- TemplateBeginEditable name="applylocal" -->
        <?php wdnInclude("/wdn/templates_5.1/includes/local/apply-local.html"); ?>
        <!-- TemplateEndEditable -->
        <?php wdnInclude("/wdn/templates_5.1/includes/global/apply-global-2.html"); ?>
        <?php wdnInclude("/wdn/templates_5.1/includes/global/give-global-1.html"); ?>
        <!-- TemplateBeginEditable name="givelocal" -->
        <?php wdnInclude("/wdn/templates_5.1/includes/local/give-local.html"); ?>
        <!-- TemplateEndEditable -->
        <?php wdnInclude("/wdn/templates_5.1/includes/global/give-global-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-global-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/idm.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/search.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/header-global-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/logo-lockup-1.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/site-affiliation-1.html"); ?>
    <!-- TemplateBeginEditable name="affiliation" -->
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/site-affiliation-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/site-title-1.html"); ?>
    <!-- TemplateBeginEditable name="titlegraphic" -->
    <a class="unl-site-title-short" href="https://www.unl.edu/">
        Web Application
    </a>
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/site-title-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/logo-lockup-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-toggle-group.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-menu-1.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-menu-child-app-1.html"); ?>
    <!-- TemplateBeginEditable name="appcontrols" -->
    <?php wdnInclude("/wdn/templates_5.1/includes/local/app-controls.html"); ?>
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-menu-child-app-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/nav-menu-2.html"); ?>
    <?php wdnInclude("/wdn/templates_5.1/includes/global/app-search-1.html"); ?>
    <!-- TemplateBeginEditable name="appsearch" -->
    <?php wdnInclude("/wdn/templates_5.1/includes/local/app-search.html"); ?>
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/app-search-2.html"); ?>
</header>

<main class="dcf-wrapper" id="dcf-main" role="main" tabindex="-1">
    <!-- TemplateBeginEditable name="maincontentarea" -->
    <p>Impress your audience with awesome content!</p>
    <!-- TemplateEndEditable -->
</main>
<footer class="dcf-footer" id="dcf-footer" role="contentinfo">
    <!-- TemplateBeginEditable name="optionalfooter" -->
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/footer-global-1.html"); ?>
    <!-- TemplateBeginEditable name="contactinfo" -->
    <?php wdnInclude("/wdn/templates_5.1/includes/local/footer-local.html"); ?>
    <!-- TemplateEndEditable -->
    <?php wdnInclude("/wdn/templates_5.1/includes/global/footer-global-2.html"); ?>
</footer>
<?php wdnInclude("/wdn/templates_5.1/includes/global/noscript.html"); ?>
<?php wdnInclude("/wdn/templates_5.1/includes/global/js-body.html"); ?>
<!-- TemplateBeginEditable name="jsbody" -->
<!-- put your custom javascript here -->
<!-- TemplateEndEditable -->
</body>
</html>
