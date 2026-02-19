# Extraccion ERP Viditec

Extrae productos, categorias, marcas e imagenes del ERP Viditec y los guarda en archivos JSON.

## Instalacion

```bash
npm install
```

## Uso

```bash
npm run fetch
```

Genera 4 archivos JSON con la fecha del dia:

- `productos-YYYY-MM-DD.json`
- `categorias-YYYY-MM-DD.json`
- `marcas-YYYY-MM-DD.json`
- `imagenes-YYYY-MM-DD.json`

## Endpoints

| Recurso    | file param                  | Token         |
|------------|-----------------------------|---------------|
| Productos  | `get_productos_fecha_imp`   | viditec_token_imp  |
| Categorias | `get_categorias_imp`        | viditec_token_imp  |
| Marcas     | `get_marcas`                | viditec_vtex_token |
| Imagenes   | `get_archivos_fecha_imp`    | viditec_token_imp  |
