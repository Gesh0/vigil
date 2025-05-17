import proj4 from 'proj4'
import { NextRequest } from 'next/server'

function tile2bbox(
  x: number,
  y: number,
  z: number
): [number, number, number, number] {
  const tileSize = 256
  const earthRadius = 6378137
  const initialResolution = (2 * Math.PI * earthRadius) / tileSize
  const originShift = (2 * Math.PI * earthRadius) / 2.0
  const resolution = initialResolution / Math.pow(2, z)

  const minX = x * tileSize * resolution - originShift
  const maxY = originShift - y * tileSize * resolution
  const maxX = (x + 1) * tileSize * resolution - originShift
  const minY = originShift - (y + 1) * tileSize * resolution

  return [minX, minY, maxX, maxY]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const x = parseInt(searchParams.get('x') || '0')
  const y = parseInt(searchParams.get('y') || '0')
  const z = parseInt(searchParams.get('z') || '0')

  const sentinelUrl =
    'https://services.sentinel-hub.com/ogc/wms/45fc0cd1-14d7-47e8-9ff7-aacd06ef4240'
  const layer = 'FIREHEATMAP'
  const time = '2025-05-01/2025-05-17'

  const tileSize = 256
  const n = Math.pow(2, z)

  const lon1 = (x / n) * 360.0 - 180.0
  const lat1 =
    Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * (180 / Math.PI)
  const lon2 = ((x + 1) / n) * 360.0 - 180.0
  const lat2 =
    Math.atan(Math.sinh(Math.PI * (1 - (2 * (y + 1)) / n))) * (180 / Math.PI)

  const proj3857 =
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +no_defs'
  // const [minX, minY] = proj4('EPSG:4326', proj3857, [lon1, lat2]);
  // const [maxX, maxY] = proj4('EPSG:4326', proj3857, [lon2, lat1]);
  const [minX, minY, maxX, maxY] = tile2bbox(x, y, z)

  const wmsUrl =
    `${sentinelUrl}` +
    `?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0` +
    `&LAYERS=${layer}&FORMAT=image/png&TRANSPARENT=true` +
    `&WIDTH=256&HEIGHT=256&CRS=EPSG:3857` +
    `&BBOX=${minX},${minY},${maxX},${maxY}` +
    `&TIME=${time}`

  const tileRes = await fetch(wmsUrl)
  const buffer = await tileRes.arrayBuffer()

  console.log(`BBOX: ${minX},${minY},${maxX},${maxY}`)

  return new Response(Buffer.from(buffer), {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
