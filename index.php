<?php

declare(strict_types = 1);

const _LEXICON = 1;

$request = $_GET['q'] ?? '';

$namesAndDescriptions = [
    '' => [
        'title' => 'Klimwoordenboek Frans &amp; Engels',
        'keywords' => 'klimtermen, klimwoordenboek, klimlexicon, klimmen, sportklimmen, boulderen, klimwoorden',
        'description' => 'Franse en Engelse klimtermen en hun vertaling in het Nederlands',
        'contentFile' => 'main.php',
        'imageFile' => 'klimwoordenboek.png',
        'mainClass' => 'active',
        'gradingClass' => '',
        'gradingTablesClass' => '',
    ],
    'waarderingen' => [
        'title' => 'Klimwoordenboek Frans &amp; Engels - moeilijkheidswaarderingen',
        'keywords' => 'klimwaarderingen, moeilijkheidsgraden, moeilijkheidswaarderingen, klimmen, boulderen, boulderwaarderingen, klimwoordenboek',
        'description' => 'Moeilijkheidswaarderingen gebruikt in het klimmen',
        'contentFile' => 'grading.php',
        'imageFile' => 'klimwaarderingen.png',
        'mainClass' => '',
        'gradingClass' => 'active',
        'gradingTablesClass' => '',
    ],
    'gradenschets' => [
        'title' => 'Klimwoordenboek Frans &amp; Engels - Vergelijking moeilijkheidswaarderingen',
        'keywords' => 'klimwaarderingen, moeilijkheidsgraden, moeilijkheidswaarderingen, klimmen, boulderen, boulderwaarderingen',
        'description' => 'Vergelijking tussen moeilijkheidswaarderingen gebruikt in het klimmen',
        'contentFile' => 'grading-tables.php',
        'imageFile' => 'vergelijking.png',
        'mainClass' => '',
        'gradingClass' => '',
        'gradingTablesClass' => 'active',
    ],
];

if (!$namesAndDescriptions[$request]){
    require '404.php';
}

extract($namesAndDescriptions[$request]);

?>
<!DOCTYPE html>
<html lang="nl">
<head prefix="og: http://ogp.me/ns#">
<meta charset="utf-8">
<title><?php echo $title; ?></title>
<base href="<?php echo dirname(filter_input(INPUT_SERVER, 'PHP_SELF')).'/'; ?>">
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=5, shrink-to-fit=no">
<meta name="keywords" content="<?php echo $keywords; ?>">
<meta name="description" content="<?php echo $description; ?>">
<meta name="author" content="Jan Martin Roelofs">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#e6e5e4">
<meta property="og:type" content="website">
<meta property="og:title" content="<?php echo $title; ?>">
<meta property="og:description" content="<?php echo $description; ?>">
<meta property="og:image" content="https://www.roelofs-coaching.nl/images/klimwoordenboek/<?php echo $imageFile ;?>">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="696">
<meta property="og:image:height" content="430">
<meta property="og:url" content="https://www.roelofs-coaching.nl/klimwoordenboek/<?php echo $request ;?>">
<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="fonts/newsreader-v25-normal.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="fonts/newsreader-v25-italic.woff2">
<link rel="preload" as="image" type="image/avif" href="images/handmadepaper.avif">
<link rel="modulepreload" href="js/modules/columns.mjs">
<link rel="modulepreload" href="js/modules/rot13.mjs">
<link rel="modulepreload" href="js/modules/activeLink.mjs">
<link rel="stylesheet" href="css/lexicon.css">
<link rel="author" href="https://www.roelofs-coaching.nl/">
<link rel="canonical" href="https://www.roelofs-coaching.nl/klimwoordenboek/<?php echo $request ;?>">
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
<link rel="icon" sizes="192x192" href="images/apple-touch-icon.png">
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
<script type="module">
import { Columns } from './js/columns.mjs';
import { Rot13 } from './js/rot13.mjs';
import { ActiveLink } from './js/activeLink.mjs';
const setupFlow = new Columns().setupFlow,
    decode = new Rot13().decode,
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

document.querySelectorAll('a[href^="mailto:"]')
    .forEach(mailLink => mailLink.href = `mailto:${decode(mailLink.href.split(':')[1])}`);

setupLinks(document.querySelectorAll('#alphabet a'));
</script>
<?php include('analytics.php'); ?>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.roelofs-coaching.nl/klimwoordenboek/<?php echo $request ;?>"
  },
  "headline": "<?php echo $title; ?>",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.roelofs-coaching.nl/klimwoordenboek/images/<?php echo $imageFile ;?>",
    "width": 696,
    "height": 430
  },
  "datePublished": "2001-06-02T18:33:56+02:00",
  "dateModified": "<?php echo date(DATE_ATOM, filemtime('content/' . $contentFile)); ?>",
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
</head>
<body>

<header>
<?php include 'content/left-column.php'; ?>
</header>

<main id="<?php echo pathinfo($contentFile)['filename']; ?>">
<?php include 'content/' . $contentFile; ?>
</main>

</body>
</html>
