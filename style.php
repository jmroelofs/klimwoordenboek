<?php
require_once './vendor/autoload.php';

use ScssPhp\Server\Server;

(new Server('scss'))->serve();
