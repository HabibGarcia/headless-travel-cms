import { useState, useEffect } from 'react';

function App() {
  // Estado para guardar nuestros destinos
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar destinos al inicio
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    fetch('http://localhost:5000/api/destinations')
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error obteniendo los destinos:", error);
        setLoading(false);
      });
  };

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario (Crear nuevo destino)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newDestination = await response.json();
        // Añadimos el nuevo destino al principio de nuestra lista en pantalla
        setDestinations([newDestination, ...destinations]);
        // Limpiamos el formulario
        setFormData({ name: '', country: '', description: '' });
      } else {
        alert("Error al guardar el destino");
      }
    } catch (error) {
      console.error("Error en la petición POST:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase border-4 border-black inline-block p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-300">
            Travel CMS
          </h1>
          <p className="mt-4 text-xl font-bold bg-black text-white inline-block px-4 py-1">
            v1.0 - Panel de Administración
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA: Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-6">Añadir Destino</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase mb-1">Ciudad / Lugar</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-4 border-black p-2 font-medium focus:outline-none focus:bg-yellow-100 transition-colors"
                    placeholder="Ej. Tokio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-1">País</label>
                  <input 
                    type="text" 
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border-4 border-black p-2 font-medium focus:outline-none focus:bg-yellow-100 transition-colors"
                    placeholder="Ej. Japón"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-1">Descripción</label>
                  <textarea 
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-4 border-black p-2 font-medium focus:outline-none focus:bg-yellow-100 transition-colors resize-none"
                    placeholder="Describe el destino..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-black uppercase text-xl border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Guardando...' : 'Publicar Destino'}
                </button>
              </form>
            </div>
          </div>

          {/* COLUMNA DERECHA: Lista de destinos */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl font-black uppercase animate-pulse">Cargando base de datos...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destinations.map((dest) => (
                  <div 
                    key={dest.id} 
                    className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col"
                  >
                    <div className="mb-3">
                      <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-widest">
                        {dest.country}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black mb-2">{dest.name}</h3>
                    <p className="text-gray-700 font-medium flex-grow">
                      {dest.description}
                    </p>
                  </div>
                ))}
                
                {destinations.length === 0 && (
                  <div className="col-span-full bg-gray-100 border-4 border-black border-dashed p-8 text-center">
                    <p className="text-xl font-bold">No hay destinos todavía. ¡Añade el primero!</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;