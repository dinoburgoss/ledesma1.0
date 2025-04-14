import React, { useContext, useState } from 'react';
import { PedidoContext } from '../context/PedidoContext';
import '../styles/menu.css';

const Menu = () => {
  const { agregarAlCarrito } = useContext(PedidoContext);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState({});
  const [extrasSeleccionados, setExtrasSeleccionados] = useState({});

  const toggleCategoria = (categoria) => {
    setCategoriasAbiertas((prev) => ({
      ...prev,
      [categoria]: !prev[categoria],
    }));
  };

  const toggleExtra = (productoIndex, extra) => {
    setExtrasSeleccionados((prev) => {
      const extrasDelProducto = prev[productoIndex] || [];
      const yaSeleccionado = extrasDelProducto.find((e) => e.nombre === extra.nombre);

      const nuevosExtras = yaSeleccionado
        ? extrasDelProducto.filter((e) => e.nombre !== extra.nombre)
        : [...extrasDelProducto, extra];

      return {
        ...prev,
        [productoIndex]: nuevosExtras,
      };
    });
  };

  const handleAgregar = (producto, index) => {
    const extras = extrasSeleccionados[index] || [];
    const productoConExtras = { ...producto, extras };
    agregarAlCarrito(productoConExtras);
    setExtrasSeleccionados((prev) => ({ ...prev, [index]: [] }));
  };

  const categorias = [
    {
      nombre: 'Hamburguesas',
      productos: [
        {
          nombre: 'Clásica',
          descripcion: 'Carne, queso y pan casero',
          precio: 2500,
          imagen: 'https://simonparrilla.com.co/wp-content/uploads/2022/06/SIMON-PARRILLA-COMIDAS-RAPIDAS-HAMBURGUESA-CLASICA.webp',
          extras: [
            { nombre: 'Extra queso', precio: 400 },
            { nombre: 'Bacon', precio: 500 },
            { nombre: 'Huevo', precio: 300 },
            { nombre: 'Salsa especial', precio: 200 },
          ],
        },
        {
          nombre: 'Doble Queso',
          descripcion: 'Doble carne, doble queso',
          precio: 3200,
          imagen: '/img/hamburguesa2.jpg',
          extras: [
            { nombre: 'Extra queso', precio: 400 },
            { nombre: 'Bacon', precio: 500 },
            { nombre: 'Huevo', precio: 300 },
            { nombre: 'Salsa especial', precio: 200 },
          ],
        },
        {
          nombre: 'BBQ Bacon',
          descripcion: 'Con salsa barbacoa y bacon',
          precio: 3500,
          imagen: '/img/hamburguesa3.jpg',
          extras: [
            { nombre: 'Extra queso', precio: 400 },
            { nombre: 'Bacon', precio: 500 },
            { nombre: 'Huevo', precio: 300 },
            { nombre: 'Salsa BBQ extra', precio: 200 },
          ],
        },
        {
          nombre: 'Veggie',
          descripcion: 'Hamburguesa de garbanzo y vegetales',
          precio: 2800,
          imagen: '/img/hamburguesa4.jpg',
          extras: [
            { nombre: 'Extra palta', precio: 500 },
            { nombre: 'Queso vegano', precio: 400 },
            { nombre: 'Tofu', precio: 600 },
            { nombre: 'Hummus', precio: 300 },
          ],
        },
        {
          nombre: 'Picante',
          descripcion: 'Con jalapeños y salsa especial',
          precio: 3300,
          imagen: '/img/hamburguesa5.jpg',
          extras: [
            { nombre: 'Extra jalapeños', precio: 300 },
            { nombre: 'Queso cheddar', precio: 400 },
            { nombre: 'Bacon', precio: 500 },
            { nombre: 'Salsa picante extra', precio: 200 },
          ],
        },
      ],
    },
    {
      nombre: 'Lomitos',
      productos: [
        {
          nombre: 'Lomo Clásico',
          descripcion: 'Lomo con lechuga, tomate y mayonesa',
          precio: 3700,
          imagen: '/img/lomo1.jpg',
          extras: [
            { nombre: 'Huevo frito', precio: 400 },
            { nombre: 'Queso extra', precio: 300 },
            { nombre: 'Jamón', precio: 350 },
            { nombre: 'Papas dentro', precio: 200 },
          ],
        },
        {
          nombre: 'Lomo Completo',
          descripcion: 'Con todo lo clásico y más',
          precio: 4200,
          imagen: '/img/lomo2.jpg',
          extras: [
            { nombre: 'Adicional bacon', precio: 400 },
            { nombre: 'Doble carne', precio: 800 },
            { nombre: 'Salsa cheddar', precio: 300 },
            { nombre: 'Pepinos', precio: 200 },
          ],
        },
        {
          nombre: 'Lomo Completo 2',
          descripcion: 'Con todo lo clásico y más',
          precio: 4200,
          imagen: '/img/lomo2.jpg',
          extras: [
            { nombre: 'Adicional bacon', precio: 400 },
            { nombre: 'Doble carne', precio: 800 },
            { nombre: 'Salsa cheddar', precio: 300 },
            { nombre: 'Pepinos', precio: 200 },
          ],
        },
        {
          nombre: 'Lomo Completo 3',
          descripcion: 'Con todo lo clásico y más',
          precio: 4200,
          imagen: '/img/lomo2.jpg',
          extras: [
            { nombre: 'Adicional bacon', precio: 400 },
            { nombre: 'Doble carne', precio: 800 },
            { nombre: 'Salsa cheddar', precio: 300 },
            { nombre: 'Pepinos', precio: 200 },
          ],
        },
        {
          nombre: 'Lomo Completo 4',
          descripcion: 'Con todo lo clásico y más',
          precio: 4200,
          imagen: '/img/lomo2.jpg',
          extras: [
            { nombre: 'Adicional bacon', precio: 400 },
            { nombre: 'Doble carne', precio: 800 },
            { nombre: 'Salsa cheddar', precio: 300 },
            { nombre: 'Pepinos', precio: 200 },
          ],
        },
      ],
    },
    {
      nombre: 'Pizzas',
      productos: [
        {
          nombre: 'Muzzarella',
          descripcion: 'Masa casera con muzzarella fundida',
          precio: 2800,
          imagen: '/img/pizza1.jpg',
          extras: [
            { nombre: 'Aceitunas extra', precio: 200 },
            { nombre: 'Orégano y ajo', precio: 100 },
            { nombre: 'Extra queso', precio: 400 },
          ],
        },
        {
          nombre: 'Napolitana',
          descripcion: 'Muzzarella, tomate y ajo',
          precio: 3000,
          imagen: '/img/pizza2.jpg',
          extras: [
            { nombre: 'Jamón', precio: 400 },
            { nombre: 'Extra ajo', precio: 100 },
            { nombre: 'Tomates cherry', precio: 300 },
          ],
        },
      ],
    },
    {
      nombre: 'Milanesas',
      productos: [
        {
          nombre: 'Milanesa al Plato',
          descripcion: 'Con papas fritas y huevo',
          precio: 3500,
          imagen: '/img/milanesa1.jpg',
          extras: [
            { nombre: 'Extra huevo', precio: 300 },
            { nombre: 'Salsa criolla', precio: 200 },
            { nombre: 'Queso gratinado', precio: 400 },
          ],
        },
        {
          nombre: 'Milanesa Napolitana',
          descripcion: 'Con salsa, jamón y queso',
          precio: 3900,
          imagen: '/img/milanesa2.jpg',
          extras: [
            { nombre: 'Doble queso', precio: 400 },
            { nombre: 'Extra jamón', precio: 300 },
            { nombre: 'Papas extra', precio: 250 },
          ],
        },
        {
          nombre: 'Milanesa Fugazzeta',
          descripcion: 'Con cebolla caramelizada y queso',
          precio: 4000,
          imagen: '/img/milanesa3.jpg',
          extras: [
            { nombre: 'Extra cebolla', precio: 200 },
            { nombre: 'Queso provolone', precio: 500 },
          ],
        },
        {
          nombre: 'Milanesa a Caballo',
          descripcion: 'Con dos huevos fritos arriba',
          precio: 3900,
          imagen: '/img/milanesa4.jpg',
          extras: [
            { nombre: 'Extra huevo', precio: 300 },
            { nombre: 'Papas rústicas', precio: 300 },
          ],
        },
        {
          nombre: 'Milanesa Americana',
          descripcion: 'Con cheddar, bacon y barbacoa',
          precio: 4100,
          imagen: '/img/milanesa5.jpg',
          extras: [
            { nombre: 'Salsa BBQ extra', precio: 200 },
            { nombre: 'Doble bacon', precio: 500 },
            { nombre: 'Cheddar extra', precio: 400 },
          ],
        },
      ],
    },
    {
      nombre: 'Bebidas',
      productos: [
        {
          nombre: 'Coca Cola 500ml',
          descripcion: 'Bebida fría',
          precio: 800,
          imagen: '/img/coca500.jpg',
          extras: [],
        },
        {
          nombre: 'Agua saborizada',
          descripcion: 'Sabor limón o naranja',
          precio: 700,
          imagen: '/img/agua.jpg',
          extras: [],
        },
      ],
    },
    {
      nombre: 'Cervezas',
      productos: [
        {
          nombre: 'Cerveza Lager',
          descripcion: 'Cerveza ligera y refrescante',
          precio: 500,
          imagen: '/img/cerveza_lager.jpg',
          extras: [],
        },
        {
          nombre: 'Cerveza IPA',
          descripcion: 'Cerveza con un sabor amargo y afrutado',
          precio: 600,
          imagen: '/img/cerveza_ipa.jpg',
          extras: [],
        },
        {
          nombre: 'Cerveza Stout',
          descripcion: 'Cerveza oscura y robusta',
          precio: 650,
          imagen: '/img/cerveza_stout.jpg',
          extras: [],
        },
        {
          nombre: 'Cerveza Pilsner',
          descripcion: 'Cerveza con un sabor suave y crujiente',
          precio: 550,
          imagen: '/img/cerveza_pilsner.jpg',
          extras: [],
        },
        {
          nombre: 'Cerveza Witbier',
          descripcion: 'Cerveza blanca de trigo, ligera y refrescante',
          precio: 580,
          imagen: '/img/cerveza_witbier.jpg',
          extras: [],
        },
      ],
    },
  ];

  return (
    <div className="menu-contenedor">
      <h1 className="menu-titulo">Menú Burger Queen</h1>
      <div className="filtros-contenedor">
        {categorias.map((categoria) => (
          <div key={categoria.nombre}>
            <button
              className="filtro-toggle"
              onClick={() => toggleCategoria(categoria.nombre)}
            >
              {categoria.nombre}
            </button>
            {categoriasAbiertas[categoria.nombre] && (
              <div className="filtro-contenido">
                <div className="productos-grid">
                  {categoria.productos.map((producto, index) => (
                    <div className="producto-card" key={index}>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="producto-img"
                      />
                      <h3>{producto.nombre}</h3>
                      <p>{producto.descripcion}</p>
                      <p className="precio">${producto.precio}</p>

                      {producto.extras && producto.extras.length > 0 && (
                        <div className="extras-container">
                          <p className="extras-titulo">Extras:</p>
                          {producto.extras.map((extra, i) => {
                            const seleccionado =
                              extrasSeleccionados[index]?.some(
                                (e) => e.nombre === extra.nombre
                              );
                            return (
                              <button
                                key={i}
                                className={`extra-btn ${seleccionado ? 'seleccionado' : ''}`}
                                onClick={() => toggleExtra(index, extra)}
                              >
                                {extra.nombre} (+${extra.precio})
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <button
                        className="btn-agregar"
                        onClick={() => handleAgregar(producto, index)}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
