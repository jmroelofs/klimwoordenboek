<?php
require_once './vendor/autoload.php';

use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\OutputStyle;
use ScssPhp\Server\Server;

$scssDirectory = getcwd() . '/scss';

$scssCompiler = new Compiler();
$scssCompiler->setCharset(false);
$scssCompiler->setOutputStyle(OutputStyle::COMPRESSED);
$scssCompiler->setImportPaths($scssDirectory);

new Server($scssDirectory, null, $scssCompiler)
    ->serve();
