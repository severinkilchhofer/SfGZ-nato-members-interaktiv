
# Europäische NATO Mitglieder

In dieser Übung geht es wieder um die NATO Mitgliedstaaten Europas, aber dieses Mal werden wir die Karte interaktiv gestalten, was heisst dass unsere User zwischen den originalen Mitgliedstaaten von 1949 und den heutigen Mitgliedstaaten toggeln können.

Die geografischen Daten kommen wieder von [NaturalEarth](https://www.naturalearthdata.com/downloads/), und die Informationen über NATO-Mitgliedstaaten kommen von der [NATO website](https://www.nato.int/cps/em/natohq/topics_52044.htm).

## Start

Installiere zunächst alle node modules mit `npm install`.

```bash
npm install
```

Nachdem alles installiert ist kannst du den Server mit npm start starten.

```bash
npm start
```

Die visualisierung wird auf http://localhost:1234/ zugänglich sein.

> ⚠️ Du musst die visualisierung via localhost aufrufen. Da die daten für die Visualisierung asynchron geladen werden ist der Server notwendig. Die visualisierung wird nicht funktionieren wenn du auf das index.html doppelklickst.

## Aufgabe

1. Füge zwei Buttons auf deiner Seite hinzu. (siehe Hinweis 1)

2. Binde deine Buttons an events mithilfe von `.on()`. (siehe Hinweis 2)

3. Wechsle die Farbe der Länder, die in 1949 keine Natomitgliedstaaten waren.

## Hinweise

#### 1. Buttons

Die buttons werden von d3 generiert, da sie auch an den Datensatz angeschlossen sein müssen. Zur Hilfe gibt es bereits einen `controls` container in dem du deine Buttons anbringen kannst.

```js
const buttonData = [
  { label: "1949", value: 1949 },
  { label: "Heute", value: 2019 },
]

const controls = d3.select("#controls")

const buttons = controls.selectAll("button")
  .data(buttonData)
  .enter()
  .append("button")
    .text(d => d.label)
    .style("border", "none")
    .style("padding", "0.5rem 1.25rem")
    .style("font-size", "1rem")
    .style("font-family", "system-ui")
    .style("background", "#EEE")
    .style("color", "inherit")
```

#### 2. Button events

Events kannst du mit `.on` and deine Buttons anschliessen. Jeder event gibt dir die für diesen Knopf wichtigen Daten zurück. In diesem Fall ist `d` ein Objekt mit den Attributen `label` und `value`.

```js
buttons
  .on("click", function(d) {
    console.log("Click event: ", d)
  })
```

#### 3. Farben wechseln

Um die Farben zu wechseln musst du auf Knopfdruck erneut berechnen welche Länder NAtomitgliedsrtaaten waren an diesem Zeitpunkt. Du kannst den bereits vorhandenen `code` dafür verwenden.

```js
buttons
  .on("click", function(d) {

    shapes.attr("fill", function(country) {
      const natoMetaData = members.find(member => member.iso3 === country.properties.ADM0_A3)
      
      // Ist oder war das Land jemals ein Natomitglied?
      if (natoMetaData) {
        // Ist das Land an diesem Zeitpunkt ein Natomitglied?
        return +natoMetaData.year_of_accession <= d.value
          ? "#004990"
          : "#DDDDDD"
      }
      else {
        return "#DDDDDD"
      }
    })

  })
```
