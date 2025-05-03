export function elegirImagen(producto) {
    if (producto?.imagen?.imagen) {
      return `data:image/png;base64,${producto.imagen.imagen}`;
    } else {
      return "/all.jpg";
    }
  }