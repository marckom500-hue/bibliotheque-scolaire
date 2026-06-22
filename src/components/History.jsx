import { useState, useEffect } from "react"

export default function History() {
  const [historique, setHistorique] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historique") || "[]")
    setHistorique(data.reverse())
  }, [])

  const effacerHistorique = () => {
    if (confirm("Effacer tout l'historique ?")) {
      localStorage.removeItem("historique")
      setHistorique([])
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Historique des emprunts</h2>
        {historique.length > 0 && (
          <button onClick={effacerHistorique}
            className="text-xs text-red-500 border border-red-300 px-2 py-1 rounded-lg">
            🗑️ Effacer
          </button>
        )}
      </div>
      {historique.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">Aucun historique disponible</p>
      ) : (
        historique.map((h) => (
          <div key={h.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-orange-400">
            <p className="font-bold text-gray-800">{h.titre}</p>
            <p className="text-sm text-gray-500">✍️ {h.auteur}</p>
            <p className="text-sm text-blue-600">👤 {h.eleve}</p>
            <div className="flex gap-4 mt-1">
              <p className="text-xs text-gray-400">📤 {h.dateEmprunt}</p>
              <p className="text-xs text-gray-400">{h.dateRetour ? `📥 ${h.dateRetour}` : "⏳ En cours"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}