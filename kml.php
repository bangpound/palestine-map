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
  $output = array(
    'type' => 'FeatureCollection',
    'features' => array(),
  );
  foreach ($items as $item) {
    $coordinates = explode(',', $item->branch('coordinates')->text());
    $properties = transform_description($item->branch('description')->text());
    $properties['name'] = $item->branch('name')->text();

    $output['features'][] = array(
      'type' => 'Feature',
      'geometry' => array(
        'type' => 'Point',
        'coordinates' => array((float)$coordinates[0], (float)$coordinates[1]),
      ),
      'properties' => $properties,
    );
  }
  file_put_contents('PalestineRemembered/'. $type .'.json', json_encode($output));
}

function transform_description($html) {
  $qp = @qp($html, NULL, array(
    'replace_entities' => TRUE,
    'ignore_parser_warnings' => TRUE,
    'use_parser' => 'html',
  ));
  $output = array();
  $qp->find('font[size=3]');
  if ($qp->size()) {
    foreach ($qp->branch('a') as $a) {
      if ($a->text() == 'Slide show') {
        $a->html('');
      }
    }

    $qp->remove('img[src$="whiteGE.gif"]');

    if ($qp->top('font[size=3]')->find('img')->size() == 1) {
      $img = $qp->top('font[size=3]')->remove('img');
      $output['image_url'] = $img->attr('src');
      $output['image_width'] = $img->attr('width');
      $output['image_height'] = $img->attr('height');
    }

    $qp->top('font[size=3]')->find('td[nowrap] b');
    if ($qp->size() == 2) {
      foreach ($qp as $item) {
        $facts[] = array_filter(explode('<br/>', $item->innerHTML()));
      }
      while (!empty($facts[0]) && !empty($facts[1])) {
        $output['facts'][array_pop($facts[0])] = array_pop($facts[1]);
      }
      $qp->html('');
    }

    $output['description'] = trim(preg_replace('/\s+/i', ' ', $qp->top('font[size=3]')->text()));
  }
  else {
    foreach ($qp->top('body')->children() as $node) {
      $output['description'] = $node->html();
    }
  }
  return $output;
}
