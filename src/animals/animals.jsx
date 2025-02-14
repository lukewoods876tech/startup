import './animals.css'

function Animals() {
  return (
    <main>
      <h2>Animals in Your Zoo</h2>
      <p>Here's a list of all the animals currently in your zoo. Click on any animal for more details!</p>

      <table>
        <caption>List of Animals in MyZoo</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Age</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leo</td>
            <td>Lion</td>
            <td>5</td>
            <td><img src="/images/lion.jpg" alt="Lion" className="animal-thumbnail"/></td>
          </tr>
          <tr>
            <td>Daisy</td>
            <td>Elephant</td>
            <td>12</td>
            <td><img src="/images/elephant.jpg" alt="Elephant" className="animal-thumbnail"/></td>
          </tr>
          <tr>
            <td>Zippy</td>
            <td>Giraffe</td>
            <td>8</td>
            <td><img src="/images/giraffe.jpg" alt="Giraffe" className="animal-thumbnail"/></td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

export default Animals 