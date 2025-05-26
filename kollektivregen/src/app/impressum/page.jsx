import BackButton from '@/src/components/backbutton';
import React from 'react'

export default function Impressum() {
  return (
    <div className='flex flex-col padding-21 py-[5vh] lg:pt-[10vh] lg:pl-[10vh] gap-8'>
        <BackButton />
        <h1 className="text-4xl lg:text-[90px]">Impressum</h1>
        <div className='lg:pl-[10vh] lg:max-w-[50vw] flex flex-col gap-8 lg:text-lg lg:leading-[24px]'>
            <p>Impressum gemäß § 5 ECG gemäß § 5 E-Commerce-Gesetz (ECG)<br />
            Betreiber: kollektivregen<br />
            Kontakt: kollektivregen@gmail.com<br />
            Anschrift: Keine ladungsfähige Postanschrift vorhanden – postalische Erreichbarkeit eingeschränkt.<br />
            Rechtsform: Privatperson / künstlerisches Studentenprojekt:
            </p>

            <p>Fachhochschule Salzburg<br />
            Urstein Süd 1<br />
            5412 Puch bei Hallein, Austria
            </p>

            <p>Design & Konzept: Benedikt Wienerroither<br />
            Design & Konzept: Johannes Linder<br />
            Design & Konzept: Johanna Juszt<br />
            Design & Konzept: Medea Canazei
            </p>
            <p>Webentwicklung & Technische Umsetzung: Helin Güyen </p>

        </div>
    </div>
  );
}