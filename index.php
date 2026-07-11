<?php
    declare (strict_types = 1);

    const _LEXICON = 1;

    $request = $_GET['q'] ?? '';

    $mainUrl = 'https://www.roelofs-coaching.nl/klimwoordenboek/';

    switch ($request) {
    case '':
        $title              = 'Klimwoordenboek Frans &amp; Engels';
        $keywords           = 'klimtermen, klimwoordenboek, klimlexicon, klimmen, sportklimmen, boulderen, klimwoorden';
        $description        = 'Franse en Engelse klimtermen en hun vertaling in het Nederlands';
        $contentFile        = 'content/lexicon.php';
        $imageUrl           = $mainUrl . 'images/klimwoordenboek.png';
        $lexiconClass       = 'active';
        $gradingClass       = '';
        $gradingTablesClass = '';
        $class              = 'continuous-column';
        break;
    case 'waarderingen':
        $title              = 'Klimwoordenboek Frans &amp; Engels - moeilijkheidswaarderingen';
        $keywords           = 'klimwaarderingen, moeilijkheidsgraden, moeilijkheidswaarderingen, klimmen, boulderen, boulderwaarderingen, klimwoordenboek';
        $description        = 'Moeilijkheidswaarderingen gebruikt in het klimmen';
        $contentFile        = 'content/grading.php';
        $imageUrl           = $mainUrl . 'images/klimwaarderingen.png';
        $lexiconClass       = '';
        $gradingClass       = 'active';
        $gradingTablesClass = '';
        $class              = 'continuous-column';
        break;
    case 'gradenschets':
        $title              = 'Klimwoordenboek Frans &amp; Engels - Vergelijking moeilijkheidswaarderingen';
        $keywords           = 'klimwaarderingen, moeilijkheidsgraden, moeilijkheidswaarderingen, klimmen, boulderen, boulderwaarderingen';
        $description        = 'Vergelijking tussen moeilijkheidswaarderingen gebruikt in het klimmen';
        $contentFile        = 'content/grading-tables.php';
        $imageUrl           = $mainUrl . 'images/vergelijking.png';
        $lexiconClass       = '';
        $gradingClass       = '';
        $gradingTablesClass = 'active';
        $class              = '';
        break;
    default:
        require 'content/404.php';
    }

    $href       = (filter_input(INPUT_SERVER, 'PHP_SELF') |> dirname(...)) . '/';
    $contentUrl = $mainUrl . $request;

    date_default_timezone_set('Europe/Amsterdam');
    $formattedLastEdited = $contentFile
        |> filemtime(...)
        |> new IntlDateFormatter('nl_NL', IntlDateFormatter::LONG, IntlDateFormatter::NONE)
            ->format(...);
    $AtomLastEdited = date(
        DATE_ATOM,
        $contentFile |> filemtime(...)
    );

    $mailAddress = strtr(
        'jmartinr@home.nl',
        json_decode(file_get_contents('json/rotTable.json'), true)
            |> array_flip(...)
    );
?>
<!DOCTYPE html>
<html lang="nl">
<head prefix="og: http://ogp.me/ns#">
<meta charset="utf-8">
<?php include 'content/head.php'; ?>
</head>
<body>

<header>
<?php include 'content/header.php'; ?>
</header>

<main class="<?php echo $class; ?>">
<?php include $contentFile; ?>
</main>

</body>
</html>
