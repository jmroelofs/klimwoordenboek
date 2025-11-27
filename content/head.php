<?php

declare(strict_types = 1);

if (! defined( '_LEXICON' )) {
    require '404.php';
}

?>
<title><?php echo $title; ?></title>
<base href="<?php echo $href; ?>">
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=5, shrink-to-fit=no">
<meta name="keywords" content="<?php echo $keywords; ?>">
<meta name="description" content="<?php echo $description; ?>">
<meta name="author" content="Jan Martin Roelofs">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#e6e5e4">
<meta property="og:type" content="website">
<meta property="og:title" content="<?php echo $title; ?>">
<meta property="og:description" content="<?php echo $description; ?>">
<meta property="og:image" content="<?php echo $imageUrl; ?>">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="696">
<meta property="og:image:height" content="430">
<meta property="og:url" content="<?php echo $contentUrl; ?>">
<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="fonts/newsreader-v26-normal.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="fonts/newsreader-v26-italic.woff2">
<link rel="preload" as="image" type="image/avif" href="images/handmadepaper.avif">
<link rel="modulepreload" href="js/columns.mjs">
<link rel="modulepreload" href="js/rot.mjs">
<link rel="modulepreload" href="js/activeLink.mjs">
<link rel="stylesheet" href="css/main.css">
<link rel="author" href="https://www.roelofs-coaching.nl/">
<link rel="canonical" href="<?php echo $contentUrl ;?>">
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
<link rel="icon" sizes="192x192" href="images/apple-touch-icon.png">
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
<script type="module">
import table from "./json/rotTable.json" with { type: "json" };
import { Columns } from './js/columns.mjs';
import { Rot } from './js/rot.mjs';
import { ActiveLink } from './js/activeLink.mjs';
const setupFlow = new Columns().setupFlow,
    decode = new Rot(table).decode,
    setupLinks = new ActiveLink().setupLinks,
    maxWaitingTime = 1000,
    warn = () => console.warn(`Fonts were not available after waiting ${maxWaitingTime} milliseconds`);

// we prefer to wait until the fonts are loaded
new Promise((resolve, reject) => {
    setTimeout(reject, maxWaitingTime);
    document.fonts.ready.then(resolve);
})
    .catch(warn)
    .finally(setupFlow);

setupLinks(document.querySelectorAll('#alphabet a'));

document.querySelectorAll('a[href^="mailto:"]')
    .forEach(mailLink => mailLink.href = mailLink.href.replace(/(?<=mailto:).*/i, decode));
</script>
<?php include('content/analytics.php'); ?>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "<?php echo $contentUrl; ?>"
  },
  "headline": "<?php echo $title; ?>",
  "image": {
    "@type": "ImageObject",
    "url": "<?php echo $imageUrl; ?>",
    "width": 696,
    "height": 430
  },
  "datePublished": "2001-06-02T18:33:56+02:00",
  "dateModified": "<?php echo $AtomLastEdited; ?>",
  "author": {
    "@type": "Person",
    "url": "https://www.roelofs-coaching.nl/",
    "name": "Jan Martin Roelofs"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Roelofs Coaching",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.roelofs-coaching.nl/templates/purity_iii/roelofscoaching.png",
      "width": 600,
      "height": 60
    }
  },
  "description": "<?php echo $description; ?>"
}
</script>
