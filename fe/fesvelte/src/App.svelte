<script>
  let nome = $state();
  let cognome = $state();
  let sesso = $state();
  let skills = $state([]);
  let responseMessage = $state();
  let utenti = $state([]);
  let dataNascita = $state();

  function toggleSkill(skill) {
    if (skills.includes(skill)) {
      skills = skills.filter(s => s !== skill);
    } else {
      skills = [...skills, skill];
    }
  }

  async function sendName(event) {
    event.preventDefault();
    const userData = { nome, cognome, sesso, skills, dataNascita};
    try {
      const res = await fetch("http://localhost:3080/utente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        const data = await res.json();
        responseMessage = data.message;
        utenti = data.utenti;
        event.target.reset();
      } else {
        responseMessage = "Error";
      }
    } catch {
      responseMessage = "Errore di connessione";
    }
  }
</script>

<main class="container">
  <div class="card">
    <h1>Benvenuto {nome || "Utente"}</h1>
    <form onsubmit={sendName} class="myForm">
      <div class="input-group">
        <label for="nome">Nome</label>
        <input id="nome" type="text" bind:value={nome} placeholder="Inserisci il tuo nome" required>
      </div>
      <div class="input-group">
        <label for="cognome">Cognome</label>
        <input id="cognome" type="text" bind:value={cognome} placeholder="Inserisci il tuo cognome" required>
      </div>
      <div class="input-group">
        <label for="dataNascita">Data di Nascita</label>
        <input id="dataNascita" type="date" bind:value={dataNascita} required>
      </div>
      <fieldset>
        <legend>Sesso</legend>
        <div class="radio-group">
          <label><input type="radio" bind:group={sesso} value="Maschio" required> Maschio</label>
          <label><input type="radio" bind:group={sesso} value="Femmina" required> Femmina</label>
          <label><input type="radio" bind:group={sesso} value="Altro" required> Altro</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Skills</legend>
        <div class="checkbox-group">
          <label><input type="checkbox" onchange={() => toggleSkill("HTML")}> HTML</label>
          <label><input type="checkbox" onchange={() => toggleSkill("CSS")}> CSS</label>
          <label><input type="checkbox" onchange={() => toggleSkill("JavaScript")}> JavaScript</label>
          <label><input type="checkbox" onchange={() => toggleSkill("Svelte")}> Svelte</label>
        </div>
      </fieldset>
      <button type="submit">Invia</button>
    </form>
    {#if responseMessage}
      <p class="response">{responseMessage}</p>
    {/if}
    <!-- Tabella per visualizzare gli utenti creati -->
    {#if utenti.length > 0}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Data di Nascita</th>
            <th>Sesso</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {#each utenti as utente}
            <tr>
              <td>{utente.nome}</td>
              <td>{utente.cognome}</td>
              <td>{utente.dataNascita}</td>
              <td>{utente.sesso}</td>
              <td>{utente.skills.join(', ')}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</main>


<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #74ABE2, #5563DE);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
  }
  
  .card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  input[type="text"],
  input[type="date"] {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }
  
  legend {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .radio-group,
  .checkbox-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  button {
    background-color: #5563DE;
    color: #fff;
    border: none;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #4550B5;
  }
  
  .response {
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
    color: #5563DE;
  }
  
  /* Nuovo CSS per la tabella */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.5rem;
  }
  
  thead {
    background-color: #5563DE;
    color: #fff;
  }
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

