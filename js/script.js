// script.js
import { createRoot } from 'react-dom/client';

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('nav-open');
        });
    }
});

const MAX_VISIBILITY = 3;

const Card = ({title, imageUrl, description}) => (
    React.createElement('div', { className: 'card' },
        React.createElement('h2', null, title),
        imageUrl && React.createElement('img', { src: imageUrl, alt: title, style: { width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '0.5em' } }),
        React.createElement('p', null, description)
    )
);

const Carousel = ({items, containerId}) => {
    const [active, setActive] = React.useState(0);
    const count = items.length;

    return (
        React.createElement('div', { className: 'carousel' },
            active > 0 && React.createElement('button', { className: 'nav left', onClick: () => setActive(i => i - 1) }, React.createElement('i', { className: 'ti-chevron-left-outline' })),
            items.map((item, i) => (
                React.createElement('div', {
                    key: i,
                    className: 'card-container',
                    style: {
                        '--active': i === active ? 1 : 0,
                        '--offset': (active - i) / 3,
                        '--direction': Math.sign(active - i),
                        '--abs-offset': Math.abs(active - i) / 3,
                        'pointerEvents': active === i ? 'auto' : 'none',
                        'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                        'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                    }
                },
                    React.createElement(Card, { title: item.title, imageUrl: item.imageUrl, description: item.description })
                )
            )),
            active < count - 1 && React.createElement('button', { className: 'nav right', onClick: () => setActive(i => i + 1) }, React.createElement('i', { className: 'ti-chevron-right-outline' }))
        )
    );
};

const juegos = [
    { title: 'Montaña Rusa Tornado', imageUrl: 'atraccion1_thumb.jpg', description: '¡Adrenalina al máximo en nuestra increíble montaña rusa!' },
    { title: 'Carrusel Mágico', imageUrl: 'atraccion2_thumb.jpg', description: 'Un clásico para toda la familia. ¡Sube y disfruta!' },
    { title: 'Columpio Volador', imageUrl: 'atraccion3_thumb.jpg', description: 'Siente la emoción de volar por los aires con vistas espectaculares.' },
    // Agrega más juegos aquí
];

const productos = [
    { title: 'Peluche Samaco Grande', imageUrl: 'peluche1_thumb.jpg', description: 'El recuerdo perfecto de tu visita.' },
    { title: 'Gorra Edición Limitada', imageUrl: 'gorra1_thumb.jpg', description: 'Lleva el espíritu del parque contigo.' },
    { title: 'Taza Don Samaco Park', imageUrl: 'taza1_thumb.jpg', description: 'Disfruta de tu bebida favorita con nuestro logo.' },
    // Agrega más productos aquí
];

const juegosCarouselRoot = createRoot(document.getElementById('juegos-carousel'));
juegosCarouselRoot.render(React.createElement(Carousel, { items: juegos }));

const productosCarouselRoot = createRoot(document.getElementById('productos-carousel'));
productosCarouselRoot.render(React.createElement(Carousel, { items: productos }));