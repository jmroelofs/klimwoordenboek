<?php
if (! defined( '_LEXICON' )) {
    require '../404.php';
}
?>
<div>
<nav><h2><a href="/">Roelofs Coaching</a></h2>

<h1><a href="/klimwoordenboek/" class="<?php echo $mainClass; ?>">Klimwoorden&shy;boek Frans&nbsp;&amp;&nbsp;Engels</a></h1>

<h2 id="alphabet"><a href="#A">A</a><wbr><a href="#B">B</a><wbr><a href="#C">C</a><wbr><a href="#D">D</a><wbr><a href="#E">E</a><wbr><a href="#F">F</a><wbr><a href="#G">G</a><wbr><a href="#H">H</a><wbr><a href="#I">I</a><wbr><a href="#J">J</a><wbr><a href="#K">K</a><wbr><a href="#L">L</a><wbr><a href="#M">M</a><wbr><a href="#N">N</a><wbr><a href="#O">O</a><wbr><a href="#P">P</a><wbr><a href="#Q">Q</a><wbr><a href="#R">R</a><wbr><a href="#S">S</a><wbr><a href="#T">T</a><wbr><a href="#U">U</a><wbr><a href="#V">V</a><wbr><a href="#W">W</a><wbr><a href="#X">X</a><wbr><a href="#Y">Y</a><wbr><a href="#Z">Z</a></h2>

<h2><a href="/klimwoordenboek/waarderingen" class="<?php echo $gradingClass; ?>">Moeilijkheids&shy;waarderingen</a></h2>

<h2><a href="/klimwoordenboek/gradenschets" class="<?php echo $gradingTablesClass; ?>">Vergelijking moeilijkheids&shy;waarderingen</a></h2></nav>

<p><dfn>algemeen</dfn>
	In dit woor&shy;den&shy;boek staan Franse en Engelse sport&shy;klim&shy;termen. Het Franse woord staat eerst vermeld, gevolgd door het Engelse woord. Indien er meer&shy;dere woorden voor een begrip bestaan, wor&shy;den deze tegelijk be&shy;schreven.</p>
<p><dfn lang="en-US">[Am.]</dfn>
	Amerikaans Engels of Cali&shy;fornisch.</p>
<p><dfn lang="fr">[Bel.]</dfn>
	Belgisch Frans.</p>
<p><dfn lang="en-GB">[Br.]</dfn>
	Brits Engels.</p>
<p><dfn>contact/<wbr>auteur/<wbr>copyright</dfn>
	voor in&shy;for&shy;matie, toe&shy;stem&shy;ming, sugges&shy;ties of fouten: <a href="mailto:<?php echo str_rot13('jmartinr@home.nl') ?>">Jan Martin Roelofs</a>.</p>
<p><dfn>[eig.]</dfn>
	eigenlijk.</p>
<p><dfn>laatst bijgewerkt</dfn>
	<?php date_default_timezone_set('Europe/Amsterdam');
	echo (new IntlDateFormatter('nl_NL', IntlDateFormatter::LONG, IntlDateFormatter::NONE))->format(max(array_map(fn($index) => filemtime('content/' . $index['contentFile']), $namesAndDescriptions))); ?>.</p>
<p><dfn>[lett.]</dfn>
	letterlijk.</p>
<p><dfn lang="fr">[v.], [m.]</dfn>
	geslacht, vrou&shy;we&shy;lijk of man&shy;ne&shy;lijk.</p>
<p><dfn lang="fr">[.]</dfn>
	verbuiging van een bij&shy;voeg&shy;lijk naam&shy;woord.</p>
</div>
