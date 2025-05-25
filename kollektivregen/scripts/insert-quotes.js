const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const quotes = [
  { text: 'Du entdeckst eine Komposition, welche dich aus unerklärlichen Gründen anspricht.', text_formatted: 'Eine ansprechende Komposition.' },
  { text: 'Du findest eine schöne Verzerrung.', text_formatted: 'Schöne Verzerrungen' },
  { text: 'Du findest einen schönen Fehler.', text_formatted: 'Ein schöner Fehler.' },
  { text: 'Du siehst besonders viel Rot.', text_formatted: 'Rot' },
  { text: 'Du entdeckst ein unbeabsichtigtes Kunstwerk.', text_formatted: 'Ein unbeabsichtigtes Kunstwerk.' },
  { text: 'Dir fällt auf, wo sich Linien kreuzen.', text_formatted: 'Wo sich Linien kreuzen.' },
  { text: 'Du entdeckst ein schönes Chaos.', text_formatted: 'Ein schönes Chaos.' },
  { text: 'Du findest ein Objekt, das dich über seine Geschichte rätseln lässt.', text_formatted: 'Etwas, das dich über seine Geschichte rätseln lässt.' },
  { text: 'Etwas wird vom Schatten beleuchtet.', text_formatted: 'Vom Schatten beleuchtet.' },
  { text: 'Dir sticht eine ästhetische Farbkombination ins Auge.', text_formatted: 'Eine ästhetische Farbkombination.' },
  { text: 'Jedes Fenster ist ein Gemälde.', text_formatted: 'Jedes Fenster ist ein Gemälde.' },
  { text: 'Du bemerkst unterschiedliche Dinge, die in gewisser Weise zusammenpassen.', text_formatted: 'Dinge, die zusammenpassen.' },
  { text: 'Du entdeckst etwas, das fehl am Platz ist.', text_formatted: 'Etwas, das fehl am Platz ist.' },
  { text: 'Der Himmel ist für einen Moment besonders schön.', text_formatted: 'Ein besonders schöner Himmel.' },
  { text: 'Du findest einen unerwarteten Schatz am Boden.', text_formatted: 'Ein unerwarteter Schatz am Boden.' },
  { text: 'Du entdeckst eine Textur, die du unbedingt berühren möchtest.', text_formatted: 'Eine Textur, die man unbedingt berühren möchte.' },
  { text: 'Jede Tür ist ein Portal.', text_formatted: 'Jede Tür ist ein Portal.' },
  { text: 'Du entdeckst eine wunderschöne Farbe.', text_formatted: 'Eine wunderschöne Farbe.' },
  { text: 'Du findest die Zahl 23.', text_formatted: 'Die Zahl 23.' },
  { text: 'Du bemerkst, wie viel Blau dich ständig umgibt.', text_formatted: 'Blau' },
  { text: 'Dir fällt auf wie unterschiedlich die Muster am Boden sind.', text_formatted: 'Das Muster am Boden.' },
  { text: 'Du findest den Anfangsbuchstaben deines Namens überall.', text_formatted: 'Der Anfangsbuchstabe deines Namens.' },
  { text: 'Jede Stiege ist ein Podest.', text_formatted: 'Jede Stiege ist ein Podest.' },
  { text: 'Du entdeckst eine Gruppe aus vier.', text_formatted: 'Eine Gruppe aus vier.' },
  { text: 'Du siehst etwas Grünes, das dich an deine Kindheit erinnert.', text_formatted: 'Etwas Grünes, das an die Kindheit erinnert.' },
  { text: 'Du siehst etwas Asymmetrisches, das aus seiner symmetrischen Umgebung heraussticht.', text_formatted: 'Etwas Asymmetrisches, das die symmetrische Umgebung unterbricht.' },
  { text: 'Du siehst eine schöne Reflektion.', text_formatted: 'Eine schöne Reflektion' },
  { text: 'Jeder Stuhl ist ein Thron.', text_formatted: 'Jeder Stuhl ist ein Thron.' },
  { text: 'Du findest ein Objekt, das dir ein Gefühl von Ruhe vermittelt.', text_formatted: 'Ein Objekt, das ein Gefühl von Ruhe vermittelt.' },
  { text: 'Du siehst viel Gelb auf Blau.', text_formatted: 'Gelb auf Blau' },
  { text: 'Ein vertrautes Geräusch ruft eine Erinnerung wach.', text_formatted: 'Ein vertrautes Geräusch, das eine Erinnerung wachruft.' },
  { text: 'Du entdeckst ein Muster, das dir noch nie zuvor aufgefallen ist.', text_formatted: 'Ein Muster, das dir zuvor noch nie aufgefallen ist.' },
  { text: 'Jeder Aufzug ist eine Zeitmaschine.', text_formatted: 'Jeder Aufzug ist eine Zeitmaschine.' },
  { text: 'Du siehst etwas, das seine karge Umgebung verschönert.', text_formatted: 'Etwas, das seine karge Umgebung verschönert.' },
  { text: 'Du erkennst Gesichter an unerwarteten Orten.', text_formatted: 'Gesichter an unerwarteten Orten.' },
  { text: 'Dinge, die du in die Hand nimmst, fühlen sich besonders bedeutsam an.', text_formatted: 'Dinge, die du in die Hand nimmst, fühlen sich besonders bedeutsam an.' },
  { text: 'Alles, was dich umgibt, wurde sorgfältig gestaltet.', text_formatted: 'Alles, was dich umgibt, wurde sorgfältig gestaltet.' },
  { text: 'Du bemerkst, wie klein du eigentlich bist.', text_formatted: 'Wie klein du eigentlich bist.' },
  { text: 'Jeder Stern ist ein Loch im Himmel.', text_formatted: 'Jeder Stern ist ein Loch im Himmel.' },
  { text: 'Schritte scheinen ungewöhnlich laut zu sein.', text_formatted: 'Ungewöhnlich laute Schritte.' },
  { text: 'Du liest ein Wort, was etwas über dich aussagt.', text_formatted: 'Ein Wort, das etwas über dich aussagt.' },
  { text: 'Straßen sind graue Flüsse.', text_formatted: 'Graue Flüsse.' },
]

async function main() {
  await prisma.quote.deleteMany({})
  console.log('Alle alten Zitate gelöscht.')

  for (const quote of quotes) {
    await prisma.quote.create({ data: quote })
  }

  console.log('Neue Zitate erfolgreich eingefügt.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
