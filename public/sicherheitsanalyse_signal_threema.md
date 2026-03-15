# Sicherheitsanalyse: Signal vs. Threema (Stand: 2026)

Ein tiefgreifender architektonischer, kryptografischer und rechtlicher Vergleich.

---

## Inhaltsverzeichnis
1. [Einleitung: Die Evolution der digitalen Privatsphäre bis 2026](#kapitel-1-einleitung)
2. [Bedrohungsmodelle (Threat Modeling)](#kapitel-2-bedrohungsmodelle-threat-modeling)
3. [Kryptografische Primitiven](#kapitel-3-kryptografische-primitiven)
4. [Signal Protocol Deep Dive (Double Ratchet, PQXDH, SPQR)](#kapitel-4-signal-protocol-deep-dive-double-ratchet-pqxdh-spqr)
5. [Threema Ibex & NaCl](#kapitel-5-threema-ibex--nacl)
6. [Post-Quantum Cryptography](#kapitel-6-post-quantum-cryptography)
7. [Identitätsmanagement und Account-Wiederherstellung](#kapitel-7-identitätsmanagement-und-account-wiederherstellung)
8. [Client-Side Security, Backups und Multi-Device](#kapitel-8-client-side-security-backups-und-multi-device)
9. [Metadaten-Analyse und Vorratsdatenspeicherung](#kapitel-9-metadaten-analyse-und-vorratsdatenspeicherung)
10. [Jurisdiktion: US CLOUD Act vs. Schweizer DSG](#kapitel-10-jurisdiktion-us-cloud-act-vs-schweizer-dsg)
11. [Infrastruktur: Cloud-Hosting (AWS/GCP) vs. Eigene Rechenzentren](#kapitel-11-infrastruktur-cloud-hosting-awsgcp-vs-eigene-rechenzentren)
12. [Transparenz & Audits: Auswertung der Cure53-Berichte](#kapitel-12-transparenz--audits-auswertung-der-cure53-berichte)
13. [Fallstudien und Forensik-Resistenz](#kapitel-13-fallstudien-und-forensik-resistenz)
14. [Enterprise-Einsatz](#kapitel-14-enterprise-einsatz)
15. [Fazit und Ausblick](#kapitel-15-fazit-und-ausblick)
16. [Quellenverzeichnis](#quellenverzeichnis)

---

## Kapitel 1: Einleitung
Die digitale Kommunikation hat in den letzten Jahren, getrieben durch ein wachsendes öffentliches Bewusstsein für Privatsphäre und staatliche Überwachung, eine massive Transformation durchlebt. Im Jahr 2026 ist Ende-zu-Ende-Verschlüsselung (E2EE) kein Nischenprodukt für Journalisten oder Whistleblower mehr, sondern der Standard für die zivile Kommunikation. 

Konkurrierten vor einem Jahrzehnt noch proprietäre und oft unverschlüsselte Netzwerke, stehen sich heute primär Messenger gegenüber, die Sicherheit als ihr Kernversprechen ansehen. Zwei der prominentesten und am häufigsten durch unabhängige Instanzen überprüften Vertreter sind **Signal** und **Threema**. 

Obwohl beide Messenger das gleiche Ziel verfolgen – die absolute Vertraulichkeit von Inhalten und die Integrität der Kommunikation –, unterscheiden sie sich fundamental in ihrer **Architektur**, ihrer **Philosophie zur Datensparsamkeit** und ihrem **Umgang mit Metadaten**. Signal, entwickelt in den USA von einer Non-Profit-Organisation, setzt auf quelloffene Stärke, stetige technologische Innovation (z. B. Post-Quantum-Resistenz) und eine breite Adaption durch Kostenfreiheit [1]. Threema, ein kommerzielles Produkt aus der Schweiz, profitiert von extrem starken lokalen Datenschutzgesetzen und fokussiert sich auf das Konzept der vollständigen Anonymität (Privacy by Design), indem es jegliche Verknüpfung mit echten Identitäten wie Telefonnummern vermeidet [2].

Diese Ausarbeitung analysiert beide Systeme auf technischer, kryptografischer und rechtlicher Ebene. Ziel ist es, die spezifischen Stärken und Schwächen herauszuarbeiten und zu bewerten, welcher Messenger für welches Bedrohungsmodell optimal geeignet ist.

## Kapitel 2: Bedrohungsmodelle (Threat Modeling)
Sicherheit ist kein absoluter Zustand, sondern stets relativ zu einem **Bedrohungsmodell** (*Threat Model*). Die Bewertung eines Messengers hängt maßgeblich davon ab, gegen welche Art von Angreifer (Adversary) er schützen soll und welche Assets (Inhalte vs. Metadaten) am wichtigsten sind. 

Sowohl Signal als auch Threema bieten perfekten Schutz gegen passive Netzwerkanalyse (z. B. WLAN-Sniffing) und den unbefugten Zugriff durch die Server-Betreiber selbst. Dennoch divergiert ihr Schutzfokus bei erweiterten Bedrohungen.

### Einordnung der Bedrohungsakteure (Adversaries)
1. **Passive Massenüberwachung (z.B. Geheimdienste wie NSA/GCHQ):** Hört den Internetverkehr an globalen Knotenpunkten ab. Beide Messenger schützen die *Inhalte* durch starke E2EE. 
2. **Staatliche Ermittlungsbehörden (z.B. BKA/FBI):** Fragen gezielt Metadaten bei den Betreibern an (Behördenanfragen).
3. **Lokale Angreifer (Physischer Zugriff):** Angreifer, die das entsperrte Endgerät in die Hände bekommen (z.B. Grenzkontrolle, Diebstahl, Stalkerware).
4. **Zukünftige Bedrohungen (Harvest Now, Decrypt Later):** Akteure, die heute verschlüsselten Traffic aufzeichnen, um ihn in einigen Jahren mit Quantencomputern zu entschlüsseln.

### Vergleich der Bedrohungsmodelle: Signal vs. Threema

| Bedrohung / Angriffsvektor | Signal (Fokus) | Threema (Fokus) | Fazit / Unterschied |
| :--- | :--- | :--- | :--- |
| **Kenntnis über Kontakte (Social Graph)** | Schützt Metadaten sehr stark (Sealed Sender), nutzt aber weiterhin Telefonnummern als Basis (trotz Usernames seit 2024 [3]). | Bietet perfekte Anonymität durch zufällige, nicht personen-gebundene 8-stellige Threema-IDs [2]. Keine Telefonnummer nötig. | **Threema** ist überlegen, wenn absolute Anonymität benötigt wird (z. B. Whistleblowing). |
| **Massen-Datenabfragen durch Behörden** | Signal speichert fast keine verwertbaren Daten [4]. Unterliegt allerdings der US-Jurisdiktion. | Threema speichert keine IPs, Gruppen oder Kontaktlisten und unterliegt dem strengeren Schweizer DSG [5]. | **Ebenbürtig**, die Wahl hängt von der Präferenz für US- oder CH-Recht ab. |
| **Quantencomputer (Future Threats)** | Implementiert *Post-Quantum-Cryptography* (PQXDH / SPQR) seit 2023/2025 [6]. Einer der Vorreiter auf diesem Gebiet. | Nutzt das hochsichere "Ibex"-Protokoll (Perfect Forward Secrecy) [7], ist bei Post-Quantum aber bisher abwartender (Anfang 2026). | **Signal** bietet aktuell den besseren Schutz gegen "Harvest Now, Decrypt Later". |
| **Physischer Zugriff auf das Gerät** | Bietet Disappearing Messages und Screen-Protection [8]. | Private, versteckte Chats und unabhängige dezentrale Backups ("Threema Safe") [9]. | **Beide** stark, erfordern aber ein sicheres Host-Betriebssystem. |

**Zusammenfassend lässt sich sagen:**
* **Signal** eignet sich durch seine extreme Krypto-Innovation (Post-Quantum) und Verbreitung exzellent für hochsichere Kommunikation und Journalisten. Die initiale Notwendigkeit einer Rufnummer bleibt aber ein (wenn auch durch Usernames geminderter) Faktor.
* **Threema** glänzt dort, wo der Nutzer absolute Anonymität wahren möchte und Wert auf Datenspeicherung in der Schweiz (Fernab des US CLOUD Acts) legt.

## Kapitel 3: Kryptografische Primitiven
Die Sicherheit jedes Krypto-Systems steht und fällt mit der Wahl der zugrundeliegenden kryptografischen Primitiven. Auch wenn das Protokoll-Design fehlerfrei ist, kann eine schwache Verschlüsselungskomponente das gesamte System kompromittieren. Signal und Threema setzen hier auf völlig unterschiedliche Paradigmen: Komposition von Standard-Primitiven (Signal) versus Nutzung einer integrierten High-Level-Library (Threema).

### Signals Primitiven (Agile Komposition)
Das Signal Protocol wurde iterativ entwickelt und verwendet etablierte, standardisierte Komponenten. Es kombiniert diese nach Best-Practice-Methoden:
* **Asymmetrische Kryptografie (Schlüsselaustausch):** Signal verwendet das elliptische Kurvenverfahren **X25519** (Curve25519) für den Diffie-Hellman-Schlüsselaustausch. Zusätzlich wird in der neuesten Protokollversion **PQXDH** (seit 2023) der Post-Quantum KEM **Kyber-1024** (ML-KEM) eingesetzt [10].
* **Symmetrische Verschlüsselung:** Für die eigentliche Verschlüsselung der Nachrichteninhalte kommt **AES-256** im **CBC-Modus** (mit PKCS#7 Padding) oder AES-GCM zum Einsatz.
* **Message Authentication (Integrität):** Um Manipulationen auszuschließen, nutzt Signal **HMAC-SHA256**.
* **Key Derivation Function (KDF):** Hier kommt standardmäßig **HKDF** zum Einsatz.

### Threemas Primitiven (NaCl / "Networking and Cryptography Library")
Threema verfolgte von Beginn an einen anderen Ansatz. Anstatt Primitiven selbst zusammenzusetzen, entschied man sich für die Nutzung von **NaCl** (ausgesprochen "Salt"), einer von Daniel J. Bernstein entwickelten Bibliothek, die bekanntermaßen extrem sicher gegen Implementierungsfehler (wie Timing-Attacks) konzipiert ist [11]. Die Core-Primitiven (zusammengefasst unter der Abstraktion `crypto_box`) sind:
* **Asymmetrische Kryptografie:** Auch hier kommt **Curve25519** zum Einsatz (wie bei Signal).
* **Symmetrische Verschlüsselung:** Threema nutzt den extrem schnellen Stream-Cipher **XSalsa20**, der für Software-Implementierungen optimiert ist.
* **Message Authentication:** Für die Integrität sorgt der Message Authentication Code **Poly1305**.

### Direkter Vergleich der Primitiven

| Funktion | Signal | Threema (NaCl) | Bewertung |
| :--- | :--- | :--- | :--- |
| **Elliptische Kurve** | X25519 | Curve25519 | **Identisch.** Beides State-of-the-Art und extrem sicher. |
| **Symmetrischer Cipher** | AES-256 | XSalsa20 | **Ebenbürtig.** AES profitiert oft von Hardware-Beschleunigung, XSalsa20 ist softwareseitig sehr resistent gegen Side-Channel-Attacks. |
| **Message Authentication** | HMAC-SHA256 | Poly1305 | **Beide sicher.** Poly1305 gilt als performanter für bestimmte Architekturen. |
| **Post-Quantum KEM** | Kyber-1024 | - (Noch nicht flächendeckend) | **Vorteil Signal.** |

## Kapitel 4: Signal Protocol Deep Dive (Double Ratchet, PQXDH, SPQR)
Das **Signal Protocol** (ursprünglich Axolotl) gilt heute branchenweit als Goldstandard für asynchrone Kommunikationssysteme und wird in abgewandelter Form auch von WhatsApp, Google Messages und Skype verwendet. Die Genialität des Protokolls liegt in seinen selbstheilenden Eigenschaften.

### 4.1. The Double Ratchet Algorithm
Der Kern des Signal Protocols ist der "Double Ratchet" (Doppel-Ratsche) Algorithmus. Er kombiniert zwei KDF-Ketten (Key Derivation Function), um zwei fundamentale Sicherheitseigenschaften zu garantieren:
1. **Forward Secrecy (Vorwärtsgeheimnis):** Wenn ein Schlüssel kompromittiert wird, können *vergangene* Nachrichten nicht entschlüsselt werden, da die Schlüsselkette eine Einwegfunktion ist. (Realisiert durch die *Symmetric-Key Ratchet*).
2. **Future Secrecy (Zukunftsgeheimnis) / Post-Compromise Security:** Selbst wenn ein Schlüssel auf dem Gerät geknackt wurde, repariert sich die Kette nach wenigen Nachrichten von selbst, sobald neue DH-Schlüssel ausgetauscht wurden. (Realisiert durch die *Diffie-Hellman Ratchet*).

Jede asynchrone Nachricht bei Signal verändert die Schlüssel. Dies bedeutet: Selbst im unwahrscheinlichen Fall der physischen Beschlagnahmung eines Telefons und dem Extrahieren aktueller Schlüssel im RAM, ist der Angreifer blind für vergangene Chats und (sobald das Opfer einen neuen DH-Satz sendet) auch für zukünftige [12].

### 4.2. PQXDH (Post-Quantum Extended Diffie-Hellman)
Der ursprüngliche X3DH-Schlüsselaustausch (Extended Triple Diffie-Hellman) von Signal wurde 2023 massiv aufgerüstet. Um gegen die Bedrohung durch Quantencomputer ("Harvest Now, Decrypt Later") gerüstet zu sein, hat Signal **PQXDH** implementiert. Dabei werden die klassischen elliptischen Kurven (X25519) in ein hybrides Design mit dem Post-Quantum-Verfahren **Kyber-1024** kombiniert [10]. Selbst wenn Kyber mathematisch gebrochen werden sollte (was unwahrscheinlich ist), schützt immer noch der klassische X25519-Algorithmus.

### 4.3. SPQR (Sparse Post-Quantum Ratchet)
Im Jahr 2025 hat Signal einen weiteren Schritt gemacht und die *Sparse Post-Quantum Ratchet* (SPQR) vorgestellt [13]. Während PQXDH den *initialen* Schlüsselaustausch gegen Quantencomputer absichert, schützt SPQR nun auch die kontinuierliche Kommunikation (*Double Ratchet*) vor quantenmechanischen Entschlüsselungsansätzen, womit Signal eines der widerstandsfähigsten Protokolle der Welt stellt.

### 4.4. Skalierbarkeit: "Sender Keys" für Gruppen
Eine massive Herausforderung der Ende-zu-Ende-Verschlüsselung sind Gruppenchats. Müsste ein Nutzer in einer 500er-Gruppe eine Nachricht 500-mal asymmetrisch verschlüsseln, würde das die Bandbreite und CPU sprengen.
Signal löst dies extrem elegant über das **Sender Key**-Verfahren: Jeder Teilnehmer erzeugt einen zufälligen "Sender Key". Dieser wird jedem Gruppenmitglied einzeln via sicherem 1:1-Chat (asymmetrisch) geschickt. Fortan schickt der Sender seine Gruppennachricht nur noch asymmetrisch signiert und *einmal* symmetrisch mit seinem Sender Key verschlüsselt an den Server. Der Server dupliziert den Ciphertext (Verteilung), und die Clients entschlüsseln ihn lokal. Dies senkt den Overhead exponentiell, wahrt aber die mathematische Sicherheit ("Fast Multicast Protocol"). Threema löste Gruppenchats klassisch per Punkt-zu-Punkt-Vervielfältigung seitens des absendenden Clients, weshalb Threema-Gruppen ursprünglich oftmals kleiner limitiert waren.

## Kapitel 5: Threema Ibex & NaCl
Lange Zeit wurde Threema dafür kritisiert, dass seine Ende-zu-Ende-Verschlüsselung kein *Perfect Forward Secrecy* (PFS) auf Message-Ebene bot (PFS war nur auf der Transport-Ebene zum Server aktiv). Dies änderte sich maßgeblich mit der Einführung des **Ibex-Protokolls** Ende 2022 [14].

### 5.1. Die klassische NaCl-Architektur
Wie in Kapitel 3 beschrieben, nutzt Threema die NaCl-Bibliothek. Vor Ibex schickte Alice eine Nachricht an Bob, indem sie ihren privaten Schlüssel und Bobs öffentlichen Schlüssel kombinierte (`crypto_box`). Das Problem: Hätte ein Angreifer Jahre später Bobs privaten Langzeitschlüssel erbeutet, hätte er alle aufgezeichneten historischen Nachrichten entschlüsseln können.

### 5.2. Das Ibex-Protokoll (Forward Secrecy für Threema)
Mit Ibex schloss Threema diese architektonische Lücke. Ibex führt ein KDF-Ratcheting ein, das dem Prinzip von Signal ähnelt, aber spezifisch auf die NaCl-Infrastruktur von Threema zugeschnitten ist [15]. 
* Anstatt den statischen Langzeitschlüssel für die eigentliche Nachrichtenverschlüsselung zu nutzen, verhandeln die Clients nun über einen Elliptic-Curve-Diffie-Hellman-Austausch (ECDH) **ephemere (flüchtige) Schlüssel** für jede Konversation.
* Diese Schlüssel rotieren iterativ. Wenn ein Schlüssel kompromittiert wird, bleiben alte Nachrichten sicher (Forward Secrecy).

Das Ibex-Protokoll wurde von Forschern der Universität Erlangen-Nürnberg unabhängig geprüft und formal verifiziert [15].

## Kapitel 6: Post-Quantum Cryptography
Das größte drohende Risiko für die asymmetrische Kryptografie (wie Curve25519 oder RSA) sind funktionsfähige Quantencomputer. Mit dem *Shor-Algorithmus* könnten diese Kurvenaktivitäten künftig in polynomialer Zeit gebrochen werden. Das akute Problem für Messenger ist die **"Harvest Now, Decrypt Later"**-Strategie von staatlichen Akteuren: Verschlüsselter Traffic wird heute massenhaft gespeichert, um ihn in 10 bis 15 Jahren mit Quantencomputern zu entschlüsseln.

### 6.1. Signals Vorreiterrolle (PQXDH & SPQR)
Signal hat das PQC-Rennen (Post-Quantum Cryptography) im Messenger-Markt maßgeblich angestoßen. 
1. **PQXDH (2023):** Signal führte einen hybriden Schlüsselaustausch ein. Der klassische X25519-Algorithmus wird mit dem vom NIST standardisierten **Kyber-1024** (ML-KEM) kombiniert [10]. Kyber ist ein gitterbasiertes KEM (Key Encapsulation Mechanism), das als quantenresistent gilt. Das hybride Design stellt sicher: Selbst wenn Forscher eine unerwartete Schwäche in Kyber finden sollten, bleibt die fundamentale Sicherheit von X25519 unangetastet.
2. **SPQR (2025):** Während PQXDH nur den *initialen* Chat-Aufbau schützte, brachte die *Sparse Post-Quantum Ratchet* (SPQR) die Quantenresistenz auch in die fortlaufende Ratsch-Kommunikation ein [13]. Damit ist Signal branchenübergreifend extrem robust gegen "Harvest Now, Decrypt Later"-Angriffe aufgestellt.

### 6.2. Threemas Post-Quantum-Strategie
Threema hat die Bedrohung durch Quantencomputer selbstverständlich ebenfalls antizipiert und kooperiert mit Forschern (u. a. von IBM), um quantensichere Algorithmen zu evaluieren [16]. Allerdings verfolgt Threema (Stand 2026) einen konservativeren Ansatz als Signal. Anstatt extrem neue und potenziell noch unzureichend langzeitgeprüfte PQC-Algorithmen sofort in die Kernarchitektur zu zwingen, fokussieren sie sich primär auf die Stabilität des Ibex-Protokolls. Threema-Nutzer sind bei der Langzeitspeicherung (Harvest Now) aktuell noch von der Sicherheit der klassischen ECC-Kurven abhängig.

### Vergleich: Quantenresistenz

| Kriterium | Signal | Threema | Fazit |
| :--- | :--- | :--- | :--- |
| **PQC-Initialisierung (KEM)** | Kyber-1024 (PQXDH) | In Entwicklung / Evaluierung | **Signal** schützt bereits aktiv gegen Quantencomputer in der Schlüsselaushandlung. |
| **PQC im laufenden Chat** | SPQR (seit 2025) | Nein | **Threema** wartet auf breitere praktische Validierung der NIST-Standards. |
| **Strategie** | Aggressiver "First Mover" | Konservativ & abwartend | **Signal** ist für stringente PQC-Angst-Szenarien aktuell zwingend zu bevorzugen. |

## Kapitel 7: Identitätsmanagement und Account-Wiederherstellung
Das Identitätsmanagement ist der wohl augenfälligste Unterschied zwischen beiden Plattformen und definiert ihre jeweiligen Anwendungsgebiete stark.

### 7.1. Identität: Telefonnummer vs. Zufalls-ID
* **Signal:** Erfordert zwingend eine gültige **Telefonnummer** zur Registrierung [1]. Zwar führte Signal 2024 nach langem Warten konfigurierbare **Usernamen** ein, um die Rufnummer in Chats vor Fremden zu verbergen [3], das Grundproblem bleibt jedoch bestehen: Der Account ist an eine physische SIM-Karte und damit (in den meisten Ländern aufgrund der Ausweispflicht) an eine reale Identität gebunden.
* **Threema:** Nutzt eine zufällig beim ersten App-Start lokal generierte, 8-stellige alphanumerische Kombination (z. B. `E8A375K9`) als **Threema-ID** [2]. Es besteht absolut kein Zwang, eine Telefonnummer oder E-Mail-Adresse zu hinterlegen. Dies ermöglicht komplett autarke, anonyme Identitäten (z. B. auf Tablets ohne SIM-Karte oder über Tor). 

### 7.2. Account-Wiederherstellung (Recovery)
Da E2EE-Messenger Nachrichten lokal speichern, ist der Verlust des Geräts problematisch (z.B. Handy verloren). Wie stellen Nutzer ihren Account wieder her? Beide Messenger unterscheiden hier prinzipiell in der Form, **was** per Backup gesichert wird (Identität/Status vs. echte Nachrichten).

* **Signals PIN & SGX (Identitäts-Recovery):** Signal nutzt "Signal PINs", um rudimentäre Profilinformationen und Einstellungen wiederherzustellen (dies beinhaltet **nicht** die Chatverläufe). Um schwache PINs kryptografisch abzusichern, nutzt Signal *Secure Value Recovery* (SVR). Die PINs werden in manipulationssicheren Intel SGX Hardware-Enklaven auf Signal-Servern verarbeitet [17].
* **Threema Safe (Identitäts- & Gruppen-Recovery):** Threema nutzt für das Kern-Profil ein dezentrales System. "Threema Safe" verschlüsselt die eigene Threema-ID, Kontakte und (metadatenfreie) Basis-Gruppenstrukturen clientseitig mit einem vom Nutzer gewählten Passwort. Auch hier sind **keine** Nachrichten-Inhalte enthalten. Das Backup kann auf Threema-Servern oder komplett dezentral auf einem eigenen Server (z. B. via WebDAV/Nextcloud) abgelegt werden [9].

| Feature | Signal | Threema | Fazit / Unterschied |
| :--- | :--- | :--- | :--- |
| **Registrierungs-Kennung** | Telefonnummer (Zwang) | Zufällige Threema-ID | **Threema** bietet ungleich stärkere "Privacy by Design". |
| **Identitätsverschleierung** | Usernames (seit 2024) | Von Natur aus anonym | Beide schützen Identitäten vor dem jeweiligen Chat-Partner. |
| **Identitäts-Recovery** | Signal PIN (SGX Enklaven) | Threema Safe (Passwort + scrypt) | Beide Ansätze stellen nur Metadaten wieder her, keine Chats. |

## Kapitel 8: Client-Side Security, Backups und Multi-Device
Selbst die stärkste Transport- und E2E-Verschlüsselung ist wertlos ("Endpoint Compromise"), wenn ein Angreifer das entsperrte Endgerät in die Hände bekommt oder unverschlüsselte Cloud-Backups auslesen kann.

### 8.1. Lokale Verschlüsselung und App-Sicherung
* **Lokale Datenbank:** Beide Messenger verschlüsseln die lokale Nachrichten-Datenbank auf dem Smartphone (z.B. mittels SQLCipher). Die Schlüssel hierfür sind kryptografisch an die Hardware-Security-Module (Secure Enclave / Titan M) des Betriebssystems gebunden.
* **Sichtschutz (Screen Security):** Signal und Threema bieten rudimentär auf das OS ausgelegte Funktionen, um die App im Task-Switcher (App-Übersicht) unkenntlich zu machen und Screenshots (auf Android) zu blockieren [8]. 
* **Private Chats:** Threema zeichnet sich durch die Funktion "Private Chats" aus: Bestimmte hochsensible Konversationen können hinter der Chat-Übersicht verborgen und erfordern eine erneute biometrische Authentifizierung zum Öffnen [9]. 

### 8.2. Cloud- und Chat-Backups
Der Transfer oder die Neu-Installation kompletter historischer Chatverläufe inklusive Videos/Fotos ist sicherheitstechnisch hochsensibel und unterscheidet sich deutlich von der reinen Identitätswiederherstellung in Kapitel 7.

* **Signal:** Bot extrem lange Chat-Backups nur für Android (als lokal verschlüsselte Datei) an; iOS-Nutzer mussten auf einen direkten Geräte-Transfer via WLAN zurückgreifen, da Signal (US-Cloud-)Backups von Apple/Google tief misstraute. 2025 füllte Signal diese schmerzhafte Lücke endlich mit eigenen **"Secure Backups"**, einem echten, optionalen Ende-zu-Ende-verschlüsselten Cloud-Backup, das direkt von Signal gehostet wird, aber kryptografisch für den Anbieter nicht auslesbar ist [18].
* **Threema:** Threema betreibt generell keine Cloud-Speicherung für Chat-Historien. Das System verlagert diese Verantwortung an das Betriebssystem (verschlüsseltes iTunes/Google Backup) oder an den Nutzer. Für Plattform-wechsel bietet Threema stattdessen eine manuelle "Daten-Backup"-Funktion an. Hierbei exportiert das Endgerät die gesamte, entschlüsselte Datenbank und sämtliche Medien, packt diese in eine gigantische ZIP-Datei und verschlüsselt sie mit einem 256-Bit starken User-Passwort (PBKDF2).

| Feature | Signal | Threema |
| :--- | :--- | :--- |
| **Lokale Datenbankverschlüsselung** | Ja (OS-gekoppelt) | Ja (OS-gekoppelt / Passwort) |
| **Versteckte / Private Einzel-Chats** | Nein (nur Zeit-löschend) | Ja (separater PIN / Biometrie pro Chat) |
| **Nachrichten-Historie Backups** | Secure Backups (E2EE in Cloud, seit 2025) | Lokaler Export verschlüsselter ZIP-Daten-Backups. |

### 8.3. Multi-Device Architektur und Desktop-Sicherheit
Ein zunehmend relevanter Angriffsvektor ist die Auslagerung von Konversationen auf **Desktop-Clients (Windows, macOS)**, da Desktop-Betriebssysteme historisch anfälliger für Malware (wie "Info Stealer") sind als abgeschottete mobile OS.

* **Signals asynchrones Multi-Device:** Signal war Vorreiter beim asynchronen Multi-Device-Support. Der Desktop-PC generiert völlig eigenständige kryptografische Schlüssel. Eine Nachricht wird vom Absender für das Smartphone **und** für den Desktop-Client des Empfängers verschlüsselt auf den Server gelegt. Das Smartphone muss dafür nicht online sein. Wird ein Desktop-Verzeichnis durch einen Trojaner kompromittiert, bleibt das Smartphone-Archiv formal sicher [27].
* **Threemas WebRTC- zu Multi-Device-Evolution:** Threema nutzte aus puristischen Sicherheitsgründen für Desktop-Sessions jahrelang einen direkten, E2EE-verschlüsselten WebRTC-Tunnel zum Smartphone. Das Smartphone war der einzige Schlüssel-Tresor und musste zwingend online und im selben Netzwerk sein (sehr sicher, aber oft unzuverlässig). Inzwischen hat Threema zur Konkurrenz aufgeschlossen und mit *Threema Desktop 2.0* ebenfalls ein vollwertiges Multi-Device-Protokoll etabliert, bei dem Desktop-Applikationen eigenständige kryptografische Entitäten bilden [28].

## Kapitel 9: Metadaten-Analyse und Vorratsdatenspeicherung
Eines der bekanntesten Zitate des ehemaligen NSA-Direktors Michael Hayden lautet: *"We kill people based on metadata."* Während E2EE den *Inhalt* einer Nachricht schützt, verraten Metadaten (Wer kommuniziert wann, wie oft, von wo und mit wem?) das gesamte soziale Gefüge. Ein oft übersehener Faktor ist hierbei nicht nur der Messenger-Server, sondern der lokale Internet Service Provider (ISP).

### 9.1. Signals "Sealed Sender" und "Private Groups V2"
Da fast jeder Signal-Account mit einer Telefonnummer verknüpft ist, wäre das Kontaktnetzwerk ("Social Graph") für den Server theoretisch sichtbar. Um dies zu verhindern, führte Signal die **"Sealed Sender"**-Technologie ein [19].
* Dabei verschlüsselt der Absender nicht nur die Nachricht, sondern auch seine eigene Identität. Er verpackt beides in einen kryptografischen Umschlag. Signal sieht nur das Ziel, nicht den Absender.
* Wie in Kapitel 4.4 beschrieben, routet der Signal-Server die effizienten "Sender Key"-Gruppennachrichten an alle Teilnehmer. Um jedoch zu verhindern, dass der Server die Gruppenmitglieder kennt, nutzt Signal **"Private Groups V2"**. Dieses System basiert auf **Zero-Knowledge Proofs (ZKP)** und anonymen Credentials. Der Server verwaltet zwar die Access Control Lists (ACL) für die Gruppe, diese sind jedoch vollständig verschlüsselt. Ein Client, der einer Gruppe etwas hinzufügen will, beweist dem Server kryptografisch anhand eines Authentifizierungs-Tokens ("I know the secret"), dass er authorisiert ist, ohne seine echte Identität (Telefonnummer) offenzulegen [29][30]. Signal bleibt blind für Gruppenmitglieder.

### 9.2. Threemas Ansatz der minimalen Datenerhebung
Threema nähert sich dem Metadaten-Problem durch radikale Datensparsamkeit ("Privacy by Design").
* **Kein Social Graph:** Da Kontakte lokal auf dem Gerät (und nicht auf dem Server) abgeglichen werden – und oftmals nur Threema-IDs ohne Nummern/Namen verwendet werden – hat der Threema-Server keine Kenntnis über das soziale Netzwerk der Nutzer.
* **Dezentrale Gruppen:** Im Gegensatz zu Signal (in früheren Versionen) oder WhatsApp "kennen" die Threema-Server keine Gruppen. Gruppenchats werden komplett dezentral auf den Endgeräten der Nutzer verwaltet. Die Server leiten lediglich verschlüsselte Einzelnachrichten weiter [20].

### 9.3. Die Rolle der ISPs (Vorratsdatenspeicherung)
Selbst wenn Signal und Threema keine Metadaten speichern, sehen lokale Telekommunikationsanbieter (Telekom, Vodafone), *dass* eine IP-Verbindung zu den Messenger-Servern aufgebaut wird.
* **Das Risiko:** In Ländern mit aktiver Vorratsdatenspeicherung (VDS) können Behörden rekonstruieren, wann ein Nutzer die App benutzt hat, indem sie die Verbindungsdaten beim ISP abfragen. 
* **Gegenmaßnahmen:** Weder Signal ("Sealed Sender", ZKP) noch Threema ("Privacy by Design") können IP-Verbindungsdaten auf Level des Endnutzer-ISPs verschleiern. Hierfür müssen Nutzer zusätzliche Netzwerkschichten wie VPNs oder Tor (z.B. Orbot) vorschalten. Threema ist in Kombination mit Tor vorteilhafter, da keine Telefonnummer zur SMS-Validierung benötigt wird, die die Tor-Anonymität sofort durchbrechen würde.

| Metadaten-Schutz | Signal | Threema |
| :--- | :--- | :--- |
| **Kenntnis über Absender** | Technisch maskiert (Sealed Sender) | Unbekannt (Nur anonyme Threema-ID sichtbar) |
| **Gruppen-Mitgliedschaften** | Verschleiert (Signal Private Groups V2) | Komplett dezentral (Server blind) |
| **Abgleich der Kontakte** | Sicher über SGX Enklaven generiert | Lokal oder Hash-basiert ohne Speicherung |
| **ISP-Sichtbarkeit (Traffic)** | TLS-verschlüsselt, IP-Verbindung sichtbar | TLS-verschlüsselt, IP-Verbindung sichtbar |

## Kapitel 10: Jurisdiktion: US CLOUD Act vs. Schweizer DSG
Die Architektur beider Messenger bedingt, dass so wenig Daten wie möglich anfallen. Dennoch unterliegen Server-Betreiber rechtlichen Rahmenbedingungen, die regeln, wie Behörden auf diese (minimalen) Daten zugreifen können.

### 10.1. Signal und das US-Recht (CLOUD Act)
Signal (bzw. die Signal Foundation) hat ihren Sitz in den USA und unterliegt US-amerikanischem Recht (insbes. Kalifornien).
* **Behördenanfragen:** US-Behörden (wie das FBI) können *Subpoenas* (Vorladungen/Beschlüsse) erzwingen. Auch durch den **CLOUD Act** können US-Behörden theoretisch sehr einfach auf Daten amerikanischer Unternehmen zugreifen, weltweit.
* **Die Realität ("Nothing to yield"):** Da Signal technisch keine verwertbaren Metadaten speichert, laufen solche Anfragen ins Leere. In veröffentlichten Transparenzberichten zu *Grand Jury Subpoenas* dokumentiert Signal regelmäßig, dass sie bei einer Anfrage zu einer Telefonnummer exakt zwei Datenpunkte liefern können: **Tag der Account-Erstellung** und **Zeitpunkt der letzten Verbindung** zum Server [4]. Mehr existiert schlichtweg nicht.

### 10.2. Threema und der Schweizer Standort-Vorteil
Threema ist ein neutrales Schweizer Unternehmen mit eigenen Servern am Standort Zürich.
* **Schweizer DSG:** Das Schweizer Datenschutzgesetz (DSG) gilt als eines der strengsten weltweit und bietet einen starken Schutz vor Überwachung.
* **Kein Direktzugriff für ausländische Behörden:** Ausländische Behörden (wie FBI, BKA) können Threema nicht direkt zwingen, Daten herauszugeben (starker Schutz vor dem Einwirken des US CLOUD Acts in Europa). Sie müssen den diplomatisch mühsamen Weg der *Internationalen Rechtshilfe (IRG)* über Schweizer Bundesgerichte gehen [5].
* **Die Realität:** Selbst wenn Schweizer Behörden eine legitime und gerichtlich angeordnete Anfrage (nach Art. 27 BÜPF) stellen, kann Threema maximal IP-Adressen für die Zukunft überwachen. Dies läuft oft ins Leere, da Nutzer per VPN oder Tor-Netzwerk agieren können und keine Echt-Namen hinterlegt sind.

## Kapitel 11: Infrastruktur und Finanzierung
Die physische Sicherheit der Server-Infrastruktur spielt bei E2EE-Messengern eine untergeordnete Rolle für die Wahrung der *Inhalte*, ist aber entscheidend für die Integrität der Dienste, den Metadaten-Schutz und die Ausfallsicherheit. Um die Langlebigkeit der Infrastruktur beurteilen zu können, muss zudem das Geschäftsmodell – das Fundament jeder Architektur – beleuchtet werden.

### 11.1. Signals Strukturen (Non-Profit & Cloud)
* **Finanzierung ("The Non-Profit Model"):** Signal wird von der *Signal Technology Foundation*, einer US-amerikanischen gemeinnützigen Organisation, betrieben. Der Wegfall jeglichen kommerziellen Drucks sichert die Unabhängigkeit. Die Foundation finanziert sich durch große Initialspritzen (wie 50 Mio. USD des WhatsApp-Mitgründers Brian Acton) und kontinuierliche Nutzer-Spenden.
* **Infrastruktur:** Um Hunderte Millionen Nutzer massenskalierbar bedienen zu können, verlässt sich Signal – entgegen der Non-Profit-Philosophie gezwungenermaßen – auf Big-Tech-Cloud-Infrastruktur (primär Amazon AWS und Google Cloud). Da Inhalte verschlüsselt sind, können AWS-Admins keine Nachrichten lesen. Es bedeutet jedoch, dass Signal auf die Stabilität großer Hyperscaler angewiesen ist.

### 11.2. Threemas Strukturen (Kommerziell & Bare-Metal)
* **Finanzierung ("Pay-to-Download"):** Threema ist ein stark gewinnorientiertes, unabhängiges Softwareunternehmen. Anstatt über Spenden wird die App direkt über einen einmaligen App-Store-Kaufpreis pro Nutzer (sowie Lizenzgebühren für Enterprise-Kunden bei "Threema Work") finanziert. Die Nutzer sind hier echte Kunden, nie das Produkt. Das etabliert ein verlässliches, autarkes Wirtschaftsmodell, hemmt aber die globale Massenadaptation gegenüber Gratis-Alternativen.
* **Infrastruktur ("Bare Metal"):** Threema verfolgt das exakte Gegenteil eines globalisierten Public-Cloud-Ansatzes. Threema betreibt eigene Server-Hardware ("Bare-Metal") in Racks und mietet keine Cloud-Instanzen von US-Konzernen an. Die Server stehen in ISO 27001-zertifizierten Hochsicherheits-Rechenzentren tief in den Schweizer Alpen (Raum Zürich) [21]. Die volle Kontrolle über die Hardware minimiert das Risiko unautorisierter fremder Stakeholder im "Hardware-Layer".

| Kriterium | Signal | Threema |
| :--- | :--- | :--- |
| **Finanzierungsmodell** | Non-Profit Foundation (Spenden) | Kommerziell (Einmalkauf/Lizenzen) |
| **Infrastruktur** | Big-Tech Cloud (AWS/GCP) | Eigene Hardware (Colocation) |
| **Skalierbarkeit** | Nahezu unbegrenzt (Cloud) | Begrenzt durch Hardwareressourcen |

## Kapitel 12: Transparenz & Audits: Auswertung der Cure53-Berichte
Vertrauen ist im Security-Sektor wertlos, harte Transparenz ist alles. Beide Messenger setzen auf offene Quellcodes und regelmäßige externe Prüfungen.

### 12.1. Open Source
* **Signal:** Sowohl die mobilen und Desktop-Clients als auch die Server-Architektur und das kryptografische Protokoll sind seit jeher vollständig Open Source und auf GitHub einsehbar.
* **Threema:** Die kryptografische Bibliothek und die App-Clients (Android, iOS, Desktop) wurden Ende 2020 vollständig Open Source gestellt [22]. Der Backend-Server-Code ist aus Schutz- und Spam-Abwehr-Gründen größtenteils proprietär. Dies ist kryptografisch unbedenklich, da das System auf einem "Zero Trust"-Modell basiert und der Server die Ende-zu-Ende-Verschlüsselung mathematisch nicht brechen kann.

### 12.2. Externe Security Audits
Beide Anbieter lassen sich regelmäßig von den härtesten Penetration-Testing-Firmen der Welt, wie **Cure53** oder **Kudelski Security**, unangekündigt prüfen.
* **Signal Audits:** Die grundlegenden formellen Beweise für das Signal Protocol gelten als Lehrstück der Kryptografie. Jedes neue Feature (wie PQXDH, SPQR) wird vor dem Rollout von akademischen Forschern und Firmen monatelang auditiert.
* **Threema (Bsp. Berichte 2024/2025):** Jüngste Audits von Cure53 konzentrierten sich auf die native Implementierung des *Ibex*-Protokolls und die neuen Zero-Knowledge-Architekturen. Threema hat hier erneut exzellente Ergebnisse erzielt; Cure53 hob in den Zusammenfassungen oft die außergewöhnlich hohe Code-Qualität und robuste Architektur hervor. Identifizierte Schwachstellen (z. B. geringfügige Denial-of-Service Vektoren in Randszenarien der lokalen Datenbank) wurden stets im Vorfeld gepatcht und transparent publiziert [23].

## Kapitel 13: Zensurresistenz und Forensik-Abwehr
Wenn kryptografische Angriffe auf das Netzwerk fehlschlagen, versuchen autoritäre Staaten oftmals, den Dienst ganz auf Netzwerkebene zu blockieren. Gelingt auch dies nicht oder ist physischer Zugriff gegeben, bleibt Ermittlern die Geräte-Forensik (Device Forensics).

### 13.1. Anti-Zensur und Domain Fronting
In repressiven Regimen (z.B. Iran, Russland) ist die reine Erreichbarkeit des Dienstes ein Sicherheits-Feature.
* **Signal (Domain Fronting & Proxies):** Signal baut aktiv Mechanismen zur Zensurumgehung ein. Historisch nutzte Signal "Domain Fronting" (Traffic wurde so maskiert, als ginge er zu Google.com, um IP-Sperren zu umgehen). Als Hyperscaler dies sperrten, etablierte Signal ein einfach zu nutzendes Proxy-System, bei dem Freiwillige weltweit Server betreiben können, um Nutzern in Zensurstaaten den Zugang zu ermöglichen [31].
* **Threema:** Threema verfügt über keine eingebauten Anti-Zensur-Mechanismen oder Proxy-Routings. Der Dienst ist darauf angewiesen, dass das Schweizer IP-Netzwerk im Zielland nicht auf staatlichen Blocklisten steht.

### 13.2. Physische Extraktion (AFU vs. BFU)
Sowohl Signal als auch Threema verlassen sich beim Schutz ruhender Daten primär auf die Full-Disk-Encryption (FDE) bzw. File-Based-Encryption (FBE) von iOS und Android. 
* **BFU (Before First Unlock):** Ist das Gerät ausgeschaltet und das Geräte-Passwort unbekannt, sind die Datenbanken beider Messenger durch den Hardware-AES-Chip des Smartphones praktisch uneinnehmbar geschützt.
* **AFU (After First Unlock):** Befindet sich das Gerät im entsperrten Zustand, können professionelle forensische Tools (wie Cellebrite) die lokalen SQLite-Datenbanken logisch oder physisch auslesen [24].

### 13.3. Spezifische Forensik-Hürden
* **Signal:** Der ehemalige CEO von Signal deutete 2021 an, dass Signal-Updates zukünftig fehlerhaften Code zum gezielten Lahmlegen ("Hack back") forensischer Software enthalten könnten [25]. Zudem nutzt Signal Disappearing Messages, die forensisch nicht wiederherstellbar sind, sobald sie physisch vom Flash-Speicher genullt wurden.
* **Threema:** Threemas "Private Chats" bieten eine exzellente Verteidigungslinie bei erzwungenem physischem Zugriff (z. B. Grenzkontrolle). Selbst wenn das Handy entsperrt übergeben wird, bleiben diese Chats ohne separaten PIN unsichtbar (was eine triviale *logische* Extraktion blockiert).

## Kapitel 14: Enterprise-Einsatz
Der Markt für sichere B2B- und Behörden-Kommunikation wächst massiv. Für Organisationen gelten jedoch völlig andere Anforderungen (Compliance, DSGVO, Administration, Revisionssicherheit) als für Privatnutzer.

### 14.1. Threema Work (Der europäische B2B-Standard)
Threema hat mit **Threema Work** sehr früh einen starken Fokus auf Geschäftskunden und den öffentlichen Sektor gelegt.
* **Adoption:** Threema Work ist der offizielle Messenger der Schweizer Armee, der Schweizer Bundesverwaltung und vieler deutscher Organisationen (z. B. Polizei-Einheiten, Bosch, Mercedes-Benz) [26].
* **Vorteile:** Threema bietet ein umfangreiches zentrales Management (MDM). IT-Administratoren können App-Policies vorgeben (z. B. "Screen-Capturing blockieren", "Keine Backups zulassen"), Nutzer über LDAP provisionieren und unternehmensweite Broadcasting-Gruppen steuern – und das **ohne** die Ende-zu-Ende-Verschlüsselung der Mitarbeiter-Chats aufzuweichen. 
* **Datenschutz:** Durch die ID-basierte Architektur (Anonymität) kollidiert Threema Work nicht mit europäischen DSGVO-Richtlinien (wie dem bedenklichen systematischen Auslesen von hybriden privaten Adressbüchern auf Firmen-Smartphones).

### 14.2. Signal im Unternehmenskontext
* **Adoption:** Signal wird extrem häufig von Vorständen, Journalisten-Teams und Politikern (z. B. in der EU-Kommission) für hochsensible "Ad-hoc-Schattenkommunikation" genutzt.
* **Nachteile:** Es existiert keine administrative "Signal Enterprise"-Version. Es fehlt an IT-Dashboards, MDM-Schnittstellen und Rollenverwaltungen. Wenn ein Mitarbeiter das Unternehmen verlässt, nimmt er seinen Signal-Account inkl. aller Firmen-Binnengespräche uneingeschränkt auf seinem privaten Gerät mit. Zudem stellt der Telefonnummern-Zwang oft ein DSGVO-Hindernis auf dienstlichen "Bring Your Own Device" (BYOD)-Geräten dar.

| Feature | Signal | Threema (Work) |
| :--- | :--- | :--- |
| **Enterprise / B2B Version** | Nein (Nur Consumer-App) | Ja (Threema Work / OnPrem) |
| **MDM / IT-Administration** | Nein | Vollständig integriert (Policies, LDAP) |
| **DSGVO / GDPR Compliance** | Strukturelle Grauzone im B2B-Umfeld | Vollumfänglich gegeben (Swiss Made) |

## Kapitel 15: Fazit und Ausblick
Sowohl Signal als auch Threema repräsentieren im Jahr 2026 die Speerspitze der sicheren, asynchronen Kommunikation. Sie beweisen eindrucksvoll, dass benutzerfreundliche Messenger nicht auf Datenausbeutung angewiesen sein müssen. Die Entscheidung für einen der beiden Dienste hängt letztlich primär vom individuellen **Bedrohungsmodell (Threat Model)** und dem Einsatzzweck ab.

* **Der "Cryptographic Innovator" (Signal):** Signal ist die unangefochtene Wahl für Nutzer, deren primäre Sorge mächtige Akteure und das Ausspähen von Inhalten in der Zukunft sind ("Harvest Now, Decrypt Later"). Durch die Arbeit im Bereich der Post-Quantum Kryptografie (PQXDH & SPQR) und das "Sealed Sender"-Prinzip bietet Signal den mathematisch stärksten machbaren Schutz. Der Hardware-Zwang (Telefonnummer für Registrierung) bleibt der einzige, wenngleich relevante, Makel für all jene, die absolute Anonymität suchen.
* **Der "Privacy Purist" & B2B-Standard (Threema):** Threema glänzt durch sein konsequentes "Privacy by Design"-Konzept. Keine Telefonnummern, keine zentralen Kontakt-Uploads, keine Cloud-Zwänge, eigener Bare-Metal-Server-Betrieb in der Schweiz und vollkommen anonyme Identitäten (Threema-IDs). Durch das Ibex-Protokoll wurde zudem kryptografisch auf den Goldstandard der Forward Secrecy aufgeschlossen. Insbesondere für den europäischen Enterprise-Sektor (Threema Work) und Nutzer mit kompromisslosem Anonymitätsbedarf gibt es aktuell keine bessere Alternative.

### Die Zukunft der E2EE
Der Konflikt um Ende-zu-Ende-Verschlüsselung wird in den nächsten Jahren nicht abkühlen. Gesetzesinitiativen wie die EU-Chatkontrolle (CSAR) oder Bestrebungen im UK (Online Safety Act) bedrohen E2EE politisch. Die Architektur von Threema und Signal – insbesondere der konsequente Zero-Trust-Ansatz – macht **Client-Side Scanning (CSS)** zur einzigen Methode für staatlich erzwungene Massenüberwachung. Beide Anbieter haben strikt erklärt, solche Architekturen (Hintertüren) niemals zu implementieren. Der wahre Stresstest in den kommenden Jahren wird somit weniger mathematischer, sondern politischer Natur sein.

---

## Quellenverzeichnis
[1] Signal Messenger, *Privacy Policy* (https://signal.org/legal/)
[2] Threema GmbH, *Privacy Policy / Threema ID* (https://threema.ch)
[3] The Hacker News, *Signal rolls out usernames to hide phone numbers* (2024)
[4] Signal Messenger, *Grand Jury Subpoena Response* (https://signal.org/bigbrother/)
[5] Threema GmbH, *Transparency Report* (https://threema.ch/de/transparency)
[6] Signal Blog, *Quantum Resistance and the Signal Protocol* / *SPQR* (https://signal.org/blog/)
[7] Threema GmbH, *Ibex Protocol Security Proof* (https://threema.ch/en/ibex)
[8] Signal, *Screen Security Features*
[9] Threema, *Threema Safe & Private Chats*
[10] Signal Blog, *Quantum Resistance and the Signal Protocol* (PQXDH)
[11] Daniel J. Bernstein et al., *Networking and Cryptography library (NaCl)*
[12] Signal, *The Double Ratchet Algorithm* (https://signal.org/docs/)
[13] IBM Security / Signal, *SPQR: Sparse Post-Quantum Ratchet* (2025)
[14] Threema GmbH, *Threema introduces Perfect Forward Secrecy* (2022)
[15] University of Erlangen-Nuremberg, *Security Proof of Threema's Communication Protocol (Ibex)*
[16] IBM Blog, *Migrating to Quantum-Safe Cryptography (Signal & Threema)*
[17] Signal Blog, *Signal PINs and Secure Value Recovery*
[18] Signal, *Introduction of Secure Backups* (2025)
[19] Signal Blog, *Sealed Sender* (https://signal.org/blog/sealed-sender/)
[20] Threema, *Cryptography Whitepaper (Gruppenverwaltung und Metadaten)*
[21] Threema GmbH, *System Architecture and Infrastructure* (2025)
[22] Threema, *Open Source Announcement* (Dezember 2020)
[23] Cure53 / Kudelski Security, *Public Audit Reports for Threema* (2023-2025)
[24] Cellebrite / Magnet Forensics, *Mobile Device Extraction Capabilities*
[25] Signal Blog, *Exploiting vulnerabilities in Cellebrite UFED* (2021)
[26] Threema GmbH, *Erfolgsgeschichten / Threema Work im Einsatz*
[27] Signal Support, *How do linked devices work?*
[28] Threema GmbH, *Threema Desktop 2.0 (Multi-Device Architecture)*
[29] Signal Blog, *Signal Private Groups V2*
[30] C. Gentry et al., *The Signal Private Group System and Anonymous Credentials*
[31] Signal Support, *How do I safely use Signal with a proxy?*
