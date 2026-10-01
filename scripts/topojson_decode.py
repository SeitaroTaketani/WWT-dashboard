"""Minimal TopoJSON -> polygon rings decoder (lon/lat), enough for Polygon / MultiPolygon objects."""


def _decode_arcs(topo):
    tr = topo.get('transform')
    arcs = []
    for arc in topo['arcs']:
        pts, x, y = [], 0, 0
        for p in arc:
            if tr:
                x += p[0]
                y += p[1]
                pts.append((x * tr['scale'][0] + tr['translate'][0], y * tr['scale'][1] + tr['translate'][1]))
            else:
                pts.append((p[0], p[1]))
        arcs.append(pts)
    return arcs


def _ring(arcs, idxs):
    out = []
    for i in idxs:
        a = arcs[i] if i >= 0 else arcs[~i][::-1]
        out.extend(a if not out else a[1:])
    return out


def features(topo, obj):
    arcs = _decode_arcs(topo)
    res = []
    for g in topo['objects'][obj]['geometries']:
        if g['type'] == 'Polygon':
            polys = [g['arcs']]
        elif g['type'] == 'MultiPolygon':
            polys = g['arcs']
        else:
            continue
        res.append({
            'properties': g.get('properties', {}),
            'polygons': [[_ring(arcs, r) for r in poly] for poly in polys],
        })
    return res
