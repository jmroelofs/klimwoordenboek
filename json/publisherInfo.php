<?php
    declare (strict_types = 1);

    if (! defined('_LEXICON')) {
    require '404.php';
    }
?>
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
