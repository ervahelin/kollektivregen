import BackButton from '@/src/components/backbutton';
import React from 'react'

export default function Datenschutz() {
  return (
    <div className='flex flex-col padding-21 py-[5vh] lg:pt-[10vh] lg:pl-[10vh] gap-8'>
        <BackButton />
        <h1 className="text-4xl lg:text-[90px]">Datenschutz</h1>
        <div className='lg:pl-[10vh] lg:max-w-[50vw] flex flex-col gap-12 lg:text-lg lg:leading-[24px]'>
            <p>Mit dem Hochladen von Bildern auf unserer Website erklären Sie sich damit einverstanden, dass diese Bilder zur Erstellung einer Galerie von Alltagsimpressionen verwendet und im Rahmen des Projekts gespeichert werden. Ziel ist es, einen pragmatischen Zugang zu Achtsamkeit im Alltag zu fördern. Durch Ihren Beitrag tragen Sie aktiv dazu bei.
            Die Galerie dient ausschließlich der Dokumentation und Präsentation verschiedener Eindrücke und kann auch auf anderen Plattformen, insbesondere Instagram, veröffentlicht werden. Wenn Sie beim Hochladen Ihren Vornamen angeben, wird dieser gegebenenfalls bei einer Veröffentlichung mitgenannt. Wenn Sie lieber anonym bleiben möchten, können Sie Ihr Bild ohne Namensangabe hochladen.<br />
            Bitte beachten Sie, dass wir uns das Recht vorbehalten, Inhalte zu entfernen, die als unangemessen oder unpassend empfunden werden, um ein respektvolles Miteinander auf der Website sicherzustellen.<br/>
            Die Daten, die wir sammeln, sind:
            <ul className='list-disc pl-8'>
                <li>Cookies</li>
                <li>Vorname (sofern angegeben)</li>
                <li>Datum des Hochladens</li>
                <li>Hochgeladenes Bild (Alltagsimpression)</li>
            </ul>
            </p>

            <div>
                <h2>Widerruf der Einwilligung</h2>
                <p>Sollten Sie Ihre hochgeladene Alltagsimpression nicht mehr auf der Website sehen wollen, haben Sie das Recht, diese jederzeit entfernen zu lassen. Für einen Widerruf schreiben Sie bitte eine E-Mail an: kollektivregen@gmail.com</p>
            </div>
            <div>
                <h2>Speicherdauer und Datenweitergabe</h2>
                <p>Ihre Daten werden auf unbestimmte Zeit gespeichert, solange keine Löschung oder ein Widerruf erfolgt. Eine Weitergabe Ihrer Daten an Dritte findet nicht statt.</p>
            </div>
             <div>
                <h2>Ihre Rechte</h2>
                <p>Sie haben jederzeit das Recht auf Auskunft über die von uns verarbeiteten personenbezogenen Daten sowie das Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Bei Fragen oder zur Ausübung Ihrer Rechte wenden Sie sich bitte ebenfalls an: kollektivregen@gmail.com.</p>
            </div>

        </div>
    </div>
  );
}