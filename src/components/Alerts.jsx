import { useState, useEffect } from "react"

export default function Alerts() {
  const [alertes, setAlertes] = useState([])

  useEffect(() => {
    const historique = JSON.parse(localStorage.getItem("historique") || "[]")
    const aujourdhui = new Date()

    const enRetard = historique.filter((h) => {
      if (h.dateRetour) return false
      const [jour, mois, annee] = h.dateEmprunt.split("/")
      const dateEmprunt = new Date(`${annee}-${mois}-${jour}`)
      const diff = (aujourdhui - dateEmprunt) / (1000 * 60 * 60 * 24)
      return diff > 7
    }).map((h) => {
      const [jour, mois, annee] = h.dateEmprunt.split("/")
      const dateEmprunt = new Date(`${annee}-${mois}-${jour}`)
      const jours = Math.floor((aujourdhui - dateEmprunt) / (1000 * 60 * 60 * 24))
      return { ...h, joursRetard: jours }
    })

    setAlertes(enRetard)
  }, [])

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">⚠️ Alertes retards</h2>

      {alertes.length === 0 ? (
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <p className="text-green-600 font-semibold text-lg">✅ Aucun retard !</p>
          <p className="text-green-500 text-sm mt-1">Tous les livres sont retournés à temps.</p>
        </div>
      ) : (
        <>
          <div className="bg-red-50 rounded-xl p-3 mb-4 text-center">
            <p className="text-red-600 font-bold">{alertes.length} emprunt(s) en retard</p>
            <p className="text-red-400 text-xs">Délai maximum : 7 jours</p>
          </div>

          {alertes.map((a) => (
            <div key={a.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-red-500">
              <p className="font-bold text-gray-800">{a.titre}</p>
              <p className="text-sm text-gray-500">✍️ {a.auteur}</p>
              <p className="text-sm text-blue-600">👤 {a.eleve}</p>
              <p className="text-xs text-gray-400">📤 Emprunté le {a.dateEmprunt}</p>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full mt-2 inline-block">
                ⚠️ {a.joursRetard} jours de retard
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}