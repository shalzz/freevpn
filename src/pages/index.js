import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SelfVPN — Own your VPN. No provider logs, no $12/mo.</title>
        <meta name="description" content="SelfVPN deploys a private WireGuard server you control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs." />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://selfvpn.8bitlabs.dev/" />
        <meta property="og:url" content="https://selfvpn.8bitlabs.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SelfVPN — Own your VPN. No provider logs, no $12/mo." />
        <meta property="og:description" content="SelfVPN deploys a private WireGuard server you control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs." />
        <meta property="og:site_name" content="SelfVPN" />
        <meta property="og:image" content="https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png" />
        <meta property="og:image:alt" content="SelfVPN - Deploy your own private WireGuard VPN server" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@8bitlabs" />
        <meta name="twitter:creator" content="@8bitlabs" />
        <meta name="twitter:title" content="SelfVPN — Own your VPN. No provider logs, no $12/mo." />
        <meta name="twitter:description" content="SelfVPN deploys a private WireGuard server you control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs." />
        <meta name="twitter:image" content="https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png" />
        <link
          rel="preload"
          as="image"
          imageSrcSet="https://image.typedream.com/cdn-cgi/image/width=640,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 640w, https://image.typedream.com/cdn-cgi/image/width=750,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 750w, https://image.typedream.com/cdn-cgi/image/width=828,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 828w, https://image.typedream.com/cdn-cgi/image/width=1080,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1080w, https://image.typedream.com/cdn-cgi/image/width=1200,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1200w, https://image.typedream.com/cdn-cgi/image/width=1920,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1920w, https://image.typedream.com/cdn-cgi/image/width=2048,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 2048w, https://image.typedream.com/cdn-cgi/image/width=3840,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 3840w"
          imageSizes="100vw"
        />
        <meta name="next-head-count" content="16" />
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" as="style" />
        <link rel="manifest" href="/site.webmanifest" />
        <script defer data-domain="selfvpn.8bitlabs.dev" src="https://plausible.8bitlabs.dev/js/script.js"></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "SelfVPN",
            "description": "SelfVPN deploys a private WireGuard server you control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs.",
            "url": "https://selfvpn.8bitlabs.dev/",
            "image": "https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png",
            "brand": { "@type": "Brand", "name": "SelfVPN" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "1"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://shalzz.gumroad.com/l/self-host-vpn",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "USD"
            }
          })
        }} />
      </Head>
      <main style={{ minHeight: "100vh" }}>
        <div className="typedream content slate-root _1buablx0 _1buablx5" style={inter.style}>
          <div className="slate-spacer r2ud8k0" style={{ height: 70, width: 700, maxWidth: "min(100%, 700px)" }} />

          <header className="slate-column _1j76um0" style={{ width: 1400, maxWidth: "min(100%, 1400px)" }}>
            <div className="_1j76um4 _1j76um1">
              <div className="_1j76umd" style={{ "--min-height": 639, "--width": 1400, "--column-width": 1400 }}>
                <div className="slate-column_item _122mapi0" style={{ "--width": "45.936%", "--width-float": 0.45936 }}>
                  <h1 className="slate-h1 ohgk4r1 ohgk4r0" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0" style={inter.style}>
                      Own your VPN. No provider logs, no{" "}
                    </span>
                    <span className="_1untytp0">
                      <span style={{ color: "#B664B0" }}>
                        <span
                          className={inter.className}
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, #6699FF 0%, #FF3366 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            WebkitBoxDecorationBreak: "clone",
                            backgroundRepeat: "no-repeat"
                          }}
                        >
                          $12/mo
                        </span>
                      </span>
                    </span>
                    <span className="_1untytp0">.</span>
                  </h1>
                  <p
                    className="slate-p _1vo7q450"
                    style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}
                  >
                    <span className="_1untytp0">
                      <span className={inter.className} style={{ color: "var(--text-light)" }}>
                        SelfVPN deploys a private <strong>WireGuard</strong> server <em>you</em> control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs — because there's no VPN company in the middle.
                      </span>
                    </span>
                  </p>
                  <div
                    className="slate-button _1paom1l0"
                    style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}
                  >
                    <a
                      href="https://shalzz.gumroad.com/l/self-host-vpn"
                      rel="noreferrer"
                    >
                      <button
                        className="_1paom1l4 _1paom1l1 _1paom1l2"
                        style={{
                          background:
                            "linear-gradient(135deg, #6699FF 0%, #FF3366 100%)",
                          color: "#ffffff",
                          boxShadow: "0 10px 20px -10px var(--shadow-color-nebula)"
                        }}
                        type="button"
                      >
                        <div />
                        <span className="_1untytp0" style={inter.style}>
                          <strong>Deploy your private VPN in 15 mins</strong>
                        </span>
                      </button>
                    </a>
                  </div>
                  <p
                    className="slate-p _1vo7q450"
                    style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "center" }}
                  >
                    <span className="_1untytp0">
                      <strong>
                        <span style={{ color: "var(--text-light)" }}>
                          {" "}
                          ★★★★★ 5 / 5 Rating (From 1 user)
                        </span>
                      </strong>
                    </span>
                  </p>
                </div>
                <div
                  className="slate-column_item _122mapi0"
                  style={{ "--width": "54.064%", "--width-float": "0.54064" }}
                >
                  <div
                    className="slate-media_embed _ce31d758 _1h3aayo0"
                    style={{
                      width: 704,
                      maxWidth: "min(100%, 704px)",
                      minHeight: "399.84999084472656px"
                    }}
                  >
                    <div contentEditable="false">
                      <video
                        playsInline={true}
                        loop={true}
                        autoPlay={true}
                        muted={true}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          margin: 0
                        }}
                      >
                        <source
                          src="https://jain.sh/static/freevpn-algo-x3-take8.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section aria-label="Supported cloud providers">
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p
            className="slate-p _1vo7q450"
            style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "center" }}
          >
            <span className="_1untytp0">
              <span style={{ color: "var(--text-sharp)", "--font-size": 20, "--mobile-font-size": 16, "--line-height": "1.4", "--mobile-line-height": 21 }}>
                Support for 10+ cloud providers
              </span>
            </span>
          </p>
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "center" }}>
            <span className="_1untytp0">
              <span style={{ color: "var(--text-light)", "--font-size": 16, "--mobile-font-size": 16 }}>
                Stop renting trust from a logging VPN provider. Own the server instead.
              </span>
            </span>
          </p>
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "center" }}>
            <span className="_1untytp0">
              <span style={{ color: "var(--text-light)" }} />
            </span>
          </p>

          <div className="slate-column _1j76um0" style={{ width: 900, maxWidth: "min(100%, 900px)" }}>
            <div className="_1j76um4 _1j76um1">
              <div className="_1j76umd" style={{ "--min-height": "95.18333435058594px", "--width": 900, "--column-width": 900 }}>
                <div className="slate-column_item _122mapi0" style={{ "--width": "20%", "--width-float": "0.2" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "center", "--max-width": "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ "--width": "51.432096962616846px", "--height": "51.432096962616846px", "--aspectRatio": "51.432096962616846 / 51.432096962616846", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="Amazon Web Services" srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={51} height={51} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slate-column_item _122mapi0" style={{ width: "20%", widthFloat: "0.2" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ width: "48.391993157217456px", height: "48.391993157217456px", aspectRatio: "48.391993157217456 / 48.391993157217456", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="Digital Ocean" srcSet="https://image.typedream.com/cdn-cgi/image/width=48,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=96,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=96,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={48} height={48} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slate-column_item _122mapi0" style={{ width: "20%", widthFloat: "0.2" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ width: "53.924123735387575px", height: "53.924123735387575px", aspectRatio: "53.924123735387575 / 53.924123735387575", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="Google cloud platform" srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={54} height={54} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slate-column_item _122mapi0" style={{ width: "20%", widthFloat: "0.2" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ width: "55.18346260108768px", height: "55.18346260108768px", aspectRatio: "55.18346260108768 / 55.18346260108768", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="linode" srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={55} height={55} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slate-column_item _122mapi0" style={{ width: "20%", widthFloat: "0.2" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ width: "52.96075739875391px", height: "52.96075739875391px", aspectRatio: "52.96075739875391 / 52.96075739875391", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="openstack" srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={53} height={53} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>

          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>

          <section aria-label="SelfVPN features">
          <div className="slate-column _1j76um0" style={{ width: 1000, maxWidth: "min(100%, 1000px)" }}>
            <div className="_1j76um4 _1j76um1">
              <div className="_1j76umd" style={{ "--min-height": 514, "--width": 1000, "--column-width": 1000 }}>
                <div className="slate-column_item _122mapi0" style={{ "--width": "55.46052631578953%", "--widthFloat": "0.5546052631578953" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "flex-start", "--max-width": "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ "--width": "493.03254153160435px", "--height": "248.05699745808846px", "--aspectRatio": "493.03254153160435 / 248.05699745808846", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="SelfVPN cloud-shell terminal screenshot" srcSet="https://image.typedream.com/cdn-cgi/image/width=640,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png 1x,https://image.typedream.com/cdn-cgi/image/width=1080,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=1080,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={493} height={248} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slate-column_item _122mapi0" style={{ "--width": "44.539473684210506%", "--width-float": "0.44539473684210507" }}>
                  <h3 className="slate-h3 ohgk4r3 ohgk4r0" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0">Cloud-shell environment</span>
                  </h3>
                  <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0">
                      <span style={{ color: "var(--text-light)" }}>
                        Pre-installed dependencies, everything set up to Just Work. You run one script; the VPN is yours.
                      </span>
                    </span>
                  </p>
                  <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0" />
                    <a href="https://shalzz.gumroad.com/l/self-host-vpn" rel="noreferrer" target="_blank" className="slate-a yk4y7v0">
                      <span className="_1untytp0">Learn more -&gt;</span>
                    </a>
                    <span className="_1untytp0" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>

          <div className="slate-column _1j76um0" style={{ width: 1000, maxWidth: "min(100%, 1000px)" }}>
            <div className="_1j76um4 _1j76um1">
              <div className="_1j76umd" style={{ "--min-height": 514, "--width": 1000, "--column-width": 1000 }}>
                <div className="slate-column_item _122mapi0" style={{ "--width": "55.656765957446794%", "--width-float": "0.556567659574468" }}>
                  <div className="slate-img _10w3u1b0" style={{ justifyContent: "center", "--max-width": "min(100%, 700px)" }}>
                    <div className="_10w3u1b1" style={{ "--width": 700, "--height": "124.32000000000001px", "--aspectRatio": "700 / 124.32000000000001", overflow: "hidden", position: "relative" }}>
                      <div contentEditable="false">
                        <img alt="WireGuard VPN protocol logo" srcSet="https://image.typedream.com/cdn-cgi/image/width=750,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png 1x,https://image.typedream.com/cdn-cgi/image/width=1920,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png 2x" src="https://image.typedream.com/cdn-cgi/image/width=1920,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png" decoding="async" data-nimg={1} className="_10w3u1b2" loading="lazy" style={{ color: "transparent" }} width={700} height={124} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slate-column_item _122mapi0" style={{ "--width": "44.343234042553235%", "--width-float": "0.4434323404255323" }}>
                  <h3 className="slate-h3 ohgk4r3 ohgk4r0" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0">WireGuard protocol, clients for every platform</span>
                  </h3>
                  <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0">
                      <span style={{ color: "var(--text-light)" }}>
                        The server runs on WireGuard — clients for iOS, Android, macOS, Windows, and Linux.
                      </span>
                    </span>
                  </p>
                  <p className="slate-p _1vo7q450" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}>
                    <span className="_1untytp0" />
                    <a href="https://www.wireguard.com/install/" rel="noreferrer" target="_blank" className="slate-a yk4y7v0">
                      <span className="_1untytp0">Learn more -&gt;</span>
                    </a>
                    <span className="_1untytp0" />
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section aria-label="Security and convenience features">
          <div
            role="none"
            className="mobile:hidden desktop:hidden _1bgwy4x2 slate-container _1bgwy4x9 _1bgwy4x0"
            style={{ minHeight: "490.0000305175781px", width: "100%", maxWidth: "100%", background: "#000000" }}
          >
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <span className="_1untytp0" />
            </p>
            <h3 className="slate-h3 ohgk4r3 ohgk4r0" style={{ width: 600, maxWidth: "min(100%, 700px)", textAlign: "center" }}>
              <span className="_1untytp0">
                <span style={{ color: "#ffffff" }}>Built with security and ease-of-use in mind</span>
              </span>
            </h3>
            <div className="slate-column _1j76um0" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <div className="_1j76um4 _1j76um1">
                <div className="_1j76umd" style={{ minHeight: 204, width: 700, columnWidth: 700 }}>
                  <div className="slate-column_item _122mapi0" style={{ width: "50%", widthFloat: "0.5" }}>
                    <div role="none" className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0" style={{ minHeight: 148, width: 300, maxWidth: "min(100%, 700px)", background: "#303045" }}>
                      <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
                        <span className="_1untytp0">
                          <strong><span style={{ color: "#ffffff" }}>Strong crypto: IKEv2 (AES-GCM, SHA2, P-256) for iOS/macOS/Linux</span></strong>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="slate-column_item _122mapi0" style={{ width: "50%", widthFloat: "0.5" }}>
                    <div role="none" className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0" style={{ minHeight: 148, width: 300, maxWidth: "min(100%, 700px)", background: "#303045" }}>
                      <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
                        <span className="_1untytp0">
                          <strong><span style={{ color: "#ffffff" }}>Auto-generated .conf files + QR codes for every platform</span></strong>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slate-column _1j76um0" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <div className="_1j76um4 _1j76um1">
                <div className="_1j76umd" style={{ minHeight: 204, width: 700, columnWidth: 700 }}>
                  <div className="slate-column_item _122mapi0" style={{ width: "50%", widthFloat: "0.5" }}>
                    <div role="none" className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0" style={{ minHeight: 148, width: 300, maxWidth: "min(100%, 700px)", background: "#303045" }}>
                      <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
                        <span className="_1untytp0">
                          <strong><span style={{ color: "#ffffff" }}>One-tap Apple profiles for iOS/macOS — no client app needed</span></strong>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="slate-column_item _122mapi0" style={{ width: "50%", widthFloat: "0.5" }}>
                    <div role="none" className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0" style={{ minHeight: 148, width: 300, maxWidth: "min(100%, 700px)", background: "#303045" }}>
                      <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
                        <span className="_1untytp0">
                          <strong><span style={{ color: "#ffffff" }}>Optional ad-blocking DNS resolver</span></strong>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "center" }}>
              <span className="_1untytp0" />
              <a href="https://selfvpn.8bitlabs.dev/index.html" rel="noreferrer" className="slate-a yk4y7v0">
                <span className="_1untytp0">
                  <span style={{ color: "#5E5DF0" }}>Check the documentation -&gt;</span>
                </span>
              </a>
              <span className="_1untytp0" />
            </p>
          </div>
          </section>

          <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>

          <section aria-label="Get started">
          <div role="none" className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0" style={{ minHeight: 303, width: 900, maxWidth: "min(100%, 900px)" }}>
            <div className="_1bgwy4xb" contentEditable="false">
              <img alt="background" sizes="100vw" src="https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png" decoding="async" data-nimg="fill" className="" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover", objectPosition: "center", color: "transparent" }} />
            </div>
            <h3 className="slate-h3 ohgk4r3 ohgk4r0" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <span className="_1untytp0">
                <span style={{ color: "#ffffff" }} className={inter.className}>
                  Deploy your own VPN server with exclusive access and control.
                </span>
              </span>
            </h3>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <span className="_1untytp0">
                <span style={{ color: "#ffffff", fontSize: 20, mobileFontSize: 16, lineHeight: "1.4", mobileLineHeight: 21 }}>
                  It takes less than 15 minutes.
                </span>
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <span className="_1untytp0">
                <span style={{ color: "#ffffff" }} />
              </span>
            </p>
            <div className="slate-button _1paom1l0" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
              <a href="https://shalzz.gumroad.com/l/self-host-vpn" rel="noreferrer">
                <button className="_1paom1l4 _1paom1l1 _1paom1l2" style={{ background: "var(--background)", color: "#6968F7", boxShadow: "0 10px 20px -10px var(--shadow-modal-color)" }} type="button">
                  <div />
                  <span className="_1untytp0">Get Started Now -&gt;</span>
                </button>
              </a>
            </div>
          </div>
          </section>

          <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>
          <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)" }}>
            <span className="_1untytp0" />
          </p>

          <article aria-label="About SelfVPN">
          <div role="none" className="_1bgwy4x2 slate-container _1bgwy4x9 _1bgwy4x0" style={{ minHeight: "auto", width: "100%", maxWidth: "100%", background: "var(--background)" }}>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "center" }}>
              <span className="_1untytp0">
                <span style={{ color: "var(--text-light)", fontSize: 20, mobileFontSize: 16, lineHeight: "1.4", mobileLineHeight: 21 }}>
                  Why own your VPN server?
                </span>
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">
                VPNs have become a requirement for many people to work and browse with a basic level of safety. But commercial VPN services simply shift your trust from your ISP to <em>them</em>.
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">
                Many VPN providers still record logs of their users — for analytics, billing, or because they were compelled to. As we've seen time and again, that metadata can be handed over and used to reconstruct your activity and identity. On top of that, you pay ~$12/month for shared "public" servers throttled by thousands of other users.
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">
                With cloud providers offering compute across geo-locations, it no longer makes sense to pay a specialized service for general resources with a thin software layer on top — especially when the engine (WireGuard) is free and open source.
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">
                SelfVPN lets anyone DIY their own VPN while keeping ownership and sovereignty of their data and identity.
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0" />
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "center" }}>
              <span className="_1untytp0">
                <span style={{ color: "var(--text-light)", fontSize: 20, mobileFontSize: 16, lineHeight: "1.4", mobileLineHeight: 21 }}>
                  The honest picture
                </span>
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">
                SelfVPN gives you <strong>provider-level privacy</strong>: no commercial VPN sitting between you and the internet, logging your activity. It is <strong>not</strong> magic anonymity — your cloud host and ISP still see that your server exists and when it's active, and the websites you visit still see your server's IP. What they <em>don't</em> get is a third party's record of everywhere you went. For most people escaping the "we don't log you (wink)" VPN industry, that's the whole point.
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0" />
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "center" }}>
              <span className="_1untytp0">
                <span style={{ color: "var(--text-light)", fontSize: 20, mobileFontSize: 16, lineHeight: "1.4", mobileLineHeight: 21 }}>
                  Who this is for
                </span>
              </span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">- People done renting trust from logging VPN providers</span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">- Privacy-conscious users who want ownership, not a subscription</span>
            </p>
            <p className="slate-p _1vo7q450" style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}>
              <span className="_1untytp0">- Anyone comfortable running a script in a cloud shell (AI assistants like ChatGPT or Claude can walk you through each step)</span>
            </p>
          </div>
          </article>

          <footer>
          <div className="slate-divider c7sewk0" style={{ maxWidth: "100%", width: 1700 }}>
            <hr className="c7sewk1" contentEditable="false" />
          </div>
          </footer>
        </div>
      </main>
    </>
  )
}
