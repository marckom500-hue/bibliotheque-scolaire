import { useState, useEffect } from "react"

export default function Students() {
  const [eleves, setEleves] = useState([])
  const [nom, setNom] = useState("")
  const [classe, setClasse] = useState("")
  const [telephone, setTelephone] = useState("")
  const [msg, setMsg] = useState("")
  const [vue, setVue] = useState("liste")
  const [recherche, setRecherche] = useState("")

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("eleves") || "[]")
    setEleves(data)
  }, [])

  const ajouterEleve = () => {
    if (!nom || !classe) { setMsg("⚠️ Nom et classe obligatoires !"); return }
    const updated = [...eleves, { id: Date.now(), nom, classe, telephone, dateInscription: new Date().toLocaleDateString("fr-FR") }]
    localStorage.setItem("eleves", JSON.stringify(updated))
    setEleves(updated)
    setNom(""); setClasse(""); setTelephone("")
    setMsg("✅ Élève ajouté !")
    setTimeout(() => setMsg(""), 3000)
  }

  const supprimerEleve = (id) => {
    if (!confirm("Supprimer cet élève ?")) return
    const updated = eleves.filter((e) => e.id !== id)
    localStorage.setItem("eleves", JSON.stringify(updated))
    setEleves(updated)
  }

  const elevesEmprunts = (nom) => {
    const historique = JSON.parse(localStorage.getItem("historique") || "[]")
    return historique.filter((h) => h.eleve === nom).length
  }

  const elevesFiltres = eleves.filter((e) =>
    e.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    e.classe.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Gestion des élèves</h2>

      {/* Onglets */}
      <div className="flex gap-2 mb-4">
        {["liste", "ajouter"].map((v) => (
          <button key={v} onClick={() => setVue(v)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize ${
              vue === v ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600"
            }`}>
            {v === "liste" ? "👥 Liste" : "➕ Ajouter"}
          </button>
        ))}
      </div>

      {msg && <p className="text-center mb-3 text-sm font-medium text-blue-700">{msg}</p>}

      {/* Ajouter élève */}
      {vue === "ajouter" && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm text-gray-600 mb-1">Nom complet</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)}
            placeholder="Ex: Jean Dupont"
            className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <label className="block text-sm text-gray-600 mb-1">Classe</label>
          <input type="text" value={classe} onChange={(e) => setClasse(e.target.value)}
            placeholder="Ex: 3ème A"
            className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <label className="block text-sm text-gray-600 mb-1">Téléphone (optionnel)</label>
          <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)}
            placeholder="Ex: 6XX XXX XXX"
            className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <button onClick={ajouterEleve}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold">
            ➕ Ajouter l'élève
          </button>
        </div>
      )}

      {/* Liste élèves */}
      {vue === "liste" && (
        <div>
          <input type="text" value={recherche} onChange={(e) => setRecherche(e.target.value)}
            placeholder="🔍 Rechercher un élève..."
            className="w-full border rounded-lg p-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <p className="text-xs text-gray-400 mb-3">{elevesFiltres.length} élève(s)</p>

          {elevesFiltres.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Aucun élève enregistré</p>
          ) : (
            elevesFiltres.map((e) => (
              <div key={e.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">👤 {e.nom}</p>
                    <p className="text-sm text-gray-500">🏫 {e.classe}</p>
                    {e.telephone && <p className="text-sm text-gray-500">📞 {e.telephone}</p>}
                    <p className="text-xs text-gray-400">📅 Inscrit le {e.dateInscription}</p>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full mt-1 inline-block">
                      📚 {elevesEmprunts(e.nom)} emprunt(s)
                    </span>
                  </div>
                  <button onClick={() => supprimerEleve(e.id)}
                    className="text-red-400 text-xs border border-red-200 px-2 py-1 rounded-lg">
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}