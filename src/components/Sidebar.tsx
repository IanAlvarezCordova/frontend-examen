import React, { useState } from 'react';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad

  const items = [
    { label: 'Dashboard', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Donantes', icon: 'pi pi-users', command: () => navigate('/donantes') },
    { label: 'Beneficiarios', icon: 'pi pi-heart', command: () => navigate('/beneficiarios') },
    { label: 'Donaciones', icon: 'pi pi-gift', command: () => navigate('/donaciones') },
  ];

  return (
    <div>
      {/* Botón para mostrar el sidebar cuando está oculto */}
      {!visible && (
        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-sm fixed top-4 left-4 z-50"
          onClick={() => setVisible(true)}
        />
      )}

      <PrimeSidebar
        visible={visible}
        onHide={() => setVisible(false)} // Oculta el sidebar al hacer clic fuera o en el botón de cerrar
        showCloseIcon={true} // Mostramos el ícono de cerrar
        className="p-sidebar-sm"
        baseZIndex={1000}
      >
        <h3 className="p-2">Gestión de Donaciones</h3>
        <Menu model={items} className="w-full border-none" />
      </PrimeSidebar>
    </div>
  );
};

export default Sidebar;