<?php
require_once './vendor/autoload.php';

use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\OutputStyle;
use ScssPhp\Server\Server;

$scss = new Compiler();
$scss->setOutputStyle(OutputStyle::COMPRESSED);

new Server('scss', null, $scss)->serve();
