<?php
/**
 * Using QueryPath.
 *
 * This file contains an example of how QueryPath can be used
 * to generate XML.
 *
 * QueryPath's ability to handle arbitrary XML comes in handy. Fragments of HTML
 * can be composed as external XML documents, and then inserted selectively into
 * an HTML document as needed. Just remember: Ever XML document -- even just a
 * string -- needs to begin with the XML declaration:
 * <code>
 * <? xml version="1.0"?>
 * </code>
 * (A space was inserted above to prevent the documentation renderer from
 * misinterpreting it.)
 * @package Examples
 * @author M Butcher <matt@aleph-null.tv>
 * @license LGPL The GNU Lesser GPL (LGPL) or an MIT-like license.
 */

require_once 'QueryPath-2.0.1/src/QueryPath/QueryPath.php';


define('KML_STUB', <<<EOT
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.0">
<Document>
    <name>PalestineRemembered.com</name>
</Document>
</kml>
EOT
);

// Create a new XML document wrapped in a QueryPath.
// By default, it will point to the root element,
// <author/>
$record = qp('PalestineRemembered/Palestine.kml', 'Placemark', array(
  'replace_entities' => TRUE,
  'ignore_parser_warnings' => TRUE,
));
$nodes = array();
foreach ($record as $node) {
  $type = str_replace('#', '', $node->branch()->find('styleUrl')->text());
  $nodes[$type][] = $node->branch();
}
foreach ($nodes as $type => $items) {
  $document = qp(KML_STUB, 'Document');
  foreach ($items as $item) {
    $document->append($item);
  }
  $document->writeXML('PalestineRemembered/'. $type .'.kml');
}
