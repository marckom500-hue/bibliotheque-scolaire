import { useState, useEffect } from "react"

export default function History() {
  const [historique, setHistorique] = useState([])
  const [enEdition, setEnEdition] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historique") || "[]")
    setHistorique([...data].reverse())
  }, [])

  const effacerHistorique = () => {
    if (!confirm("Effacer tout l'historique ?")) return
    localStorage.removeItem("historique")
    setHistorique([])
  }

  const sauvegarderModif = () => {
    const tous = JSON.parse(localStorage.getItem("historique") || "[]")
    const updated = tous.map((h) => h.id === enEdition.id ? enEdition : h)
    localStorage.setItem("historique", JSON.stringify(updated))
    setHistorique([...updated].reverse())
    setEnEdition(null)
  }

  const supprimerEntree = (id) => {
    if (!confirm("Supprimer cette entrée ?")) return
    const tous = JSON.parse(localStorage.getItem("historique") || "[]")
    const updated = tous.filter((h) => h.id !== id)
    localStorage.setItem("historique", JSON.stringify(updated))
    setHistorique([...updated].reverse())
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Historique des emprunts</h2>
        {historique.length > 0 && (
          <button onClick={effacerHistorique}
            className="text-xs text-red-500 border border-red-300 px-2 py-1 rounded-lg">
            🗑️ Effacer tout
          </button>
        )}
      </div>

      {historique.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">Aucun historique disponible</p>
      ) : (
        historique.map((h) => (
          <div key={h.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-orange-400">

            {/* Mode édition */}
            {enEdition?.id === h.id ? (
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Titre</label>
                <input value={enEdition.titre}
                  onChange={(e) => setEnEdition({ ...enEdition, titre: e.target.value })}
                  className="w-full border rounded-lg p-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <label className="text-xs text-gray-500 mb-1 block">Élève</label>
                <input value={enEdition.eleve}
                  onChange={(e) => setEnEdition({ ...enEdition, eleve: e.target.value })}
                  className="w-full border rounded-lg p-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <label className="text-xs text-gray-500 mb-1 block">Date emprunt</label>
                <input value={enEdition.dateEmprunt}
                  onChange={(e) => setEnEdition({ ...enEdition, dateEmprunt: e.target.value })}
                  className="w-full border rounded-lg p-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <label className="text-xs text-gray-500 mb-1 block">Date retour</label>
                <input value={enEdition.dateRetour || ""}
                  onChange={(e) => setEnEdition({ ...enEdition, dateRetour: e.target.value })}
                  placeholder="JJ/MM/AAAA ou vide"
                  className="w-full border rounded-lg p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <div className="flex gap-2">
                  <button onClick={sauvegarderModif}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold">
                    ✅ Sauvegarder
                  </button>
                  <button onClick={() => setEnEdition(null)}
                    className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg text-sm font-semibold">
                    ❌ Annuler
                  </button>
                </div>
              </div>
            ) : (
              /* Mode affichage */
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{h.titre}</p>
                    <p className="text-sm text-gray-500">✍️ {h.auteur}</p>
                    <p className="text-sm text-blue-600">👤 {h.eleve}</p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-xs text-gray-400">📤 {h.dateEmprunt}</p>
                      <p className="text-xs text-gray-400">
                        {h.dateRetour ? `📥 ${h.dateRetour}` : "⏳ En cours"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEnEdition(h)}
                      className="text-orange-500 text-xs border border-orange-200 px-2 py-1 rounded-lg">
                      ✏️
                    </button>
                    <button onClick={() => supprimerEntree(h.id)}
                      className="text-red-400 text-xs border border-red-200 px-2 py-1 rounded-lg">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}