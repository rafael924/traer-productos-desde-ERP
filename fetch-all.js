// fetch-all.js
// Extrae productos, categorias, marcas e imagenes del ERP Viditec
// y guarda cada uno en un archivo JSON con la fecha del dia.

const fs    = require('fs');
const fetch = require('node-fetch');

const BASE   = 'http://iweb.viditec.com.ar/modules.php';
const USER   = 'usr_crm_api_viditec';
const TOKEN  = 'viditec_token_imp';
const TOKEN2 = 'viditec_vtex_token'; // marcas usan token distinto

const ENDPOINTS = {
  productos:  BASE + '?name=' + USER + '&file=get_productos_fecha_imp&token_api_crm_viditec=' + TOKEN + '&limit=10000',
  categorias: BASE + '?name=' + USER + '&file=get_categorias_imp&token_api_crm_viditec=' + TOKEN,
  marcas:     BASE + '?name=' + USER + '&file=get_marcas&token_api_crm_viditec=' + TOKEN2 + '&limit=10000',
  imagenes:   BASE + '?name=' + USER + '&file=get_archivos_fecha_imp&token_api_crm_viditec=' + TOKEN + '&limit=10000',
};

async function fetchYGuardar(nombre, url) {
  console.log('  Fetching ' + nombre + '...');
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status + ' al obtener ' + nombre);
  const data = await res.json();
  const archivo = nombre + '-' + new Date().toISOString().split('T')[0] + '.json';
  fs.writeFileSync(archivo, JSON.stringify(data, null, 2), 'utf-8');
  const total = Array.isArray(data) ? data.length : (data.items ? data.items.length : '?');
  console.log('  OK -> ' + archivo + '  (' + total + ' registros)');
}

(async () => {
  console.log('\nIniciando extraccion ERP Viditec...\n');
  try {
    await fetchYGuardar('productos',  ENDPOINTS.productos);
    await fetchYGuardar('categorias', ENDPOINTS.categorias);
    await fetchYGuardar('marcas',     ENDPOINTS.marcas);
    await fetchYGuardar('imagenes',   ENDPOINTS.imagenes);
    console.log('\nExtraccion completada!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
