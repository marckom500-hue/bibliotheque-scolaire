import { useState, useEffect } from "react"

export default function BookList() {
  const [livres, setLivres] = useState([])
  const [filtre, setFiltre] = useState("tous")

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("livres") || "[]")
    setLivres(data)
  }, [])

  const livresFiltres = livres.filter((l) => {
    if (filtre === "disponibles") return l.disponible
    if (filtre === "empruntes") return !l.disponible
    return true
  })

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-3">Liste des livres</h2>
      <div className="flex gap-2 mb-4">
        {["tous", "disponibles", "empruntes"].map((f) => (
          <button key={f} onClick={() => setFiltre(f)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              filtre === f ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600"
            }`}>
            {f}
          </button>
        ))}
      </div>
      {livresFiltres.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">Aucun livre trouvé</p>
      ) : (
        livresFiltres.map((livre) => (
          <div key={livre.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-blue-500">
            <p className="font-bold text-gray-800">{livre.titre}</p>
            <p className="text-sm text-gray-500">✍️ {livre.auteur}</p>
            <span className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
              livre.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {livre.disponible ? "✅ Disponible" : "❌ Emprunté"}
            </span>
          </div>
        ))
      )}
    </div>
  )
}