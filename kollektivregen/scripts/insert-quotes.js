const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const quotes = [
  {
    text: 'Du entdeckst ein unbeabsichtigtes Kunstwerk.',
    text_formatted: 'Ein unbeabsichtigtes Kunstwerk.',
  },
  {
    text: 'Jede Tür ist ein Portal.',
    text_formatted: 'Jede Tür ist ein Portal.',
  },
  {
    text: 'Du entdeckst eine Gruppe aus vier.',
    text_formatted: 'Eine Gruppe aus vier.',
  },
  {
    text: 'Du siehst besonders viel Rot.',
    text_formatted: 'Rot',
  },
  {
    text: 'Du findest einen unerwarteten Schatz am Boden.',
    text_formatted: 'Ein unerwarteter Schatz am Boden.',
  },
  {
    text: 'Dir sticht eine ästhetische Farbkombination ins Auge.',
    text_formatted: 'Eine ästhetische Farbkombination.',
  },
  {
    text: 'Der Himmel ist für einen Moment besonders schön.',
    text_formatted: 'Ein besonders schöner Himmel.',
  },
  {
    text: 'Du siehst etwas Grünes, das dich an deine Kindheit erinnert.',
    text_formatted: 'Etwas Grünes, das an die Kindheit erinnert.',
  },
  {
    text: 'Jeder Stuhl ist ein Thron.',
    text_formatted: 'Jeder Stuhl ist ein Thron.',
  },
  {
    text: 'Du entdeckst eine wunderschöne Farbe.',
    text_formatted: 'Eine wunderschöne Farbe.',
  },
  {
    text: 'Du findest die Zahl 23.',
    text_formatted: 'Die Zahl 23.',
  },
  {
    text: 'Straßen sind graue Flüsse.',
    text_formatted: 'Graue Flüsse.',
  },
  {
    text: 'Dir fällt auf, wo sich Linien kreuzen.',
    text_formatted: 'Wo sich Linien kreuzen.',
  },
  {
    text: 'Du findest einen schönen Fehler.',
    text_formatted: 'Ein schöner Fehler.',
  },
  {
    text: 'Etwas wird vom Schatten beleuchtet.',
    text_formatted: 'Vom Schatten beleuchtet.',
  },
  {
    text: 'Du findest ein Objekt, das dich über seine Herkunft rätseln lässt.',
    text_formatted: 'Ein Objekt das über seine Herkunft rätseln lässt',
  },
  {
    text: 'Du entdeckst etwas, das fehl am Platz ist.',
    text_formatted: 'Etwas, das fehl am Platz ist.',
  },
  {
    text: 'Das Muster am Boden wechselt besonders oft.',
    text_formatted: 'Das Muster am Boden.',
  },
  {
    text: 'Du findest den Anfangsbuchstaben deines Namens überall.',
    text_formatted: 'Der Anfangsbuchstaben eines Namens.',
  },
  {
    text: 'Jede Stiege ist ein Podest.',
    text_formatted: 'Jede Stiege ist ein Podest',
  },
  {
    text: 'Du entdeckst eine Textur, die du unbedingt berühren möchtest.',
    text_formatted: 'Eine Textur, die man unbedingt berühren möchte.',
  },
  {
    text: 'Du entdeckst ein schönes Chaos.',
    text_formatted: 'Ein schönes Chaos.',
  },
  {
    text: 'Jedes Fenster ist ein Gemälde.',
    text_formatted: 'Jedes Fenster ist ein Gemälde.',
  },
  {
    text: 'Du siehst etwas Asymmetrisches, das aus seiner symmetrischen Umgebung heraussticht.',
    text_formatted: 'Etwas asymmetrisches, das aus seiner symmetrischen Umgebung herausbricht.',
  },
  {
    text: 'Du findest eine schöne Verzerrung.',
    text_formatted: 'Schöne Verzerrungen',
  },
  {
    text: 'Du wirst ein Objekt finden, das dir ein Gefühl von Ruhe vermittelt.',
    text_formatted: 'Ein Objekt, das ein Gefühl von Ruhe vermittelt.',
  },
  {
    text: 'Du bemerkst häufig die Farbkombination Orange auf Blau.',
    text_formatted: 'Orange auf Blau',
  },
  {
    text: 'Ein vertrautes Geräusch ruft eine Erinnerung wach.',
    text_formatted: 'Ein vertrautes Geräusch.',
  },
  {
    text: 'Du entdeckst ein Muster, das dir noch nie zuvor aufgefallen ist.',
    text_formatted: 'Ein Muster, das dir zuvor noch nie aufgefallen ist.',
  },
  {
    text: 'Jeder Aufzug ist eine Zeitmaschine.',
    text_formatted: 'Jeder Aufzug ist eine Zeitmaschine.',
  },
  {
    text: 'Du siehst etwas, das seine Umgebung verschönert.',
    text_formatted: 'Etwas, das seine Umgebung verschönert.',
  },
  {
    text: 'Du erkennst abstrakte Gesichter an unerwarteten Orten.',
    text_formatted: 'Gesichter an unerwarteten Orten.',
  },
  {
    text: 'Dir fällt ein neuer Nutzen für einen vertrauten Gegenstand ein.',
    text_formatted: 'Ein neuer Nutzen für einen vertrauten Gegenstand.',
  },
  {
    text: 'Alles, was dich umgibt, wurde sorgfältig gestaltet.',
    text_formatted: 'Alles, was dich umgibt, wurde sorgfältig gestaltet.',
  },
  {
    text: 'Dinge, die du in die Hand nimmst, fühlen sich besonders bedeutsam an.',
    text_formatted: 'Dinge, die du in die Hand nimmst, fühlen sich besonders bedeutsam an.',
  },
  {
    text: 'Bei der nächsten Autofahrt fällt dir auf, wie klein du eigentlich bist.',
    text_formatted: 'Bei der nächsten Autofahrt fällt dir auf, wie klein du eigentlich bist.',
  },
  {
    text: 'Jeder Stern ist ein Loch im Himmel.',
    text_formatted: 'Jeder Stern ist ein Loch im Himmel.',
  },
  {
    text: 'Schritte scheinen ungewöhnlich laut zu sein.',
    text_formatted: 'Ungewöhnlich laute Schritte.',
  },
  {
    text: 'Die Welt fühlt sich merkwürdig sanft an.',
    text_formatted: 'Die sanfte Welt.',
  },
]

async function main() {
  for (const quote of quotes) {
    await prisma.quote.create({ data: quote })
  }

  console.log('Alle Zitate erfolgreich eingefügt.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
