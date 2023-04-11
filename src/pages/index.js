import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
		<meta charSet="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title>SelfVPN</title>
		<meta name="description" content="Self-host your own VPN server" />
		<link rel="icon" type="image/x-icon" href="favicon.ico" />
		<link rel="apple-touch-icon" href="https://selfvpn.typedream.app/images/logo@100.png" />
		<meta property="og:url" content="https://selfvpn.8bitlabs.tech/" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="SelfVPN" />
		<meta property="og:description" content="Self-host your own VPN server" />
		<meta property="og:site_name" content="SelfVPN" />
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:site" content="@8bitlabs" />
		<meta name="twitter:title" content="SelfVPN" />
		<meta name="twitter:description" content="Self-host your own VPN server" />
		<link
			rel="preload"
			as="image"
			imageSrcSet="https://image.typedream.net/cdn-cgi/image/width=640,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 640w, https://image.typedream.net/cdn-cgi/image/width=750,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 750w, https://image.typedream.net/cdn-cgi/image/width=828,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 828w, https://image.typedream.net/cdn-cgi/image/width=1080,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1080w, https://image.typedream.net/cdn-cgi/image/width=1200,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1200w, https://image.typedream.net/cdn-cgi/image/width=1920,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1920w, https://image.typedream.net/cdn-cgi/image/width=2048,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 2048w, https://image.typedream.net/cdn-cgi/image/width=3840,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 3840w"
			imageSizes="100vw"
		/>
		<meta name="next-head-count" content="16" />
		<meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
		<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" as="style" />
      </Head>
      <main style={{ minHeight: "100vh" }}>
          {/*
          <button type="button" className="ThemeToggler_switch__UxZcW" tabIndex={-1}>
            <svg
              viewBox="0 0 20 20"
              height={32}
              width={32}
              fill="currentColor"
              className="ThemeToggler_sun__m2ZO4 ThemeToggler_icon__mrbco"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-.464 4.95.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414zm2.12-10.607a1 1 0 0 1 0 1.414l-.706.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2h1zm-7 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM5.05 6.464A1 1 0 1 0 6.465 5.05l-.708-.707a1 1 0 0 0-1.414 1.414l.707.707zm1.414 8.486-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414zM4 11a1 1 0 1 0 0-2H3a1 1 0 0 0 0 2h1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              viewBox="0 0 20 20"
              height={32}
              width={32}
              fill="currentColor"
              className="ThemeToggler_moon__0QYFn ThemeToggler_icon__mrbco"
            >
              <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
            </svg>
          </button>
          */}
          <div className="typedream content slate-root _1buablx0 _1buablx5" style={inter.style} >
            <div className="slate-spacer r2ud8k0" style={{ height: 70, width: 700, maxWidth: "min(100%, 700px)" }} />

            <div className="slate-column _1j76um0" style={{ width: 1400, maxWidth: "min(100%, 1400px)" }} >
              <div className="_1j76um4 _1j76um1">
              <div className="_1j76umd" style={{ "--min-height": 639, "--width": 1400, "--column-width": 1400 }} >
                  <div className="slate-column_item _122mapi0" style={{ "--width": "45.936%", "--width-float": 0.45936 }} >
                    <h1 className="slate-h1 ohgk4r1 ohgk4r0" style={{ "--width": 700, "--max-width": "min(100%, 700px)" }} >
                      <span className="_1untytp0" style={inter.style}>
                        Self-deploy your VPN server for low to{" "}
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
                            zero recurring cost
                          </span>
                        </span>
                      </span>
                      <span className="_1untytp0">.</span>
                    </h1>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ "--width": 700, "--max-width": "min(100%, 700px)"}}
                    >
                      <span className="_1untytp0">
                        <span className={inter.className} style={{ color: "var(--text-light)" }}>
                          SelfVPN is a script that automates end-to-end deployment and
                          configuration of a Wireguard VPN server via a cloud shell
                          environment with pre-installed dependencies on various cloud
                          server providers.
                        </span>
                      </span>
                    </p>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0">
                        <span style={{ color: "var(--text-light)" }} />
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
                        <span />
                      </span>
                    </p>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "left" }}
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
                    <p
                      className="slate-p _1vo7q450"
                      style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ "--width": 700, "--max-width": "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "center" }}
            >
              <span className="_1untytp0">
                <span />
              </span>
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ "--width": 700, "--max-width": "min(100%, 700px)", textAlign: "center" }}
            >
              <span className="_1untytp0">
                <span
                  style={{
                    color: "var(--text-sharp)",
                    "--font-size": 20,
                    "--mobile-font-size": 16,
                    "--line-height": "1.4",
                    "--mobile-line-height": 21
                  }}
                >
                  Support for 10+ cloud providers
                </span>
              </span>
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "center" }}
            >
              <span className="_1untytp0">
                <span
                  style={{ color: "var(text-light)", fontSize: 16, mobileFontSize: 16 }}
                >
                  Join others in saving recurring costs by leveraging free tier plans of
                  various cloud providers
                </span>
              </span>
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "center" }}
            >
              <span className="_1untytp0">
                <span style={{ color: "var(text-light)" }} />
              </span>
            </p>
            <div
              className="slate-column _1j76um0"
              style={{ width: 900, maxWidth: "min(100%, 900px)" }}
            >
              <div className="_1j76um4 _1j76um1">
                <div
                  className="_1j76umd"
                  style={{
                    minHeight: "95.18333435058594px",
                    width: 900,
                    columnWidth: 900
                  }}
                >
                  <div
                    className="slate-column_item _122mapi0"
                    style={{ width: "20%", widthFloat: "0.2" }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: "51.432096962616846px",
                          height: "51.432096962616846px",
                          aspectRatio: "51.432096962616846 / 51.432096962616846",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt="Amazon Web Services"
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png 1x,https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={51}
                            height={51}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slate-column_item _122mapi0"
                    style={{ width: "20%", widthFloat: "0.2" }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: "48.391993157217456px",
                          height: "48.391993157217456px",
                          aspectRatio: "48.391993157217456 / 48.391993157217456",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt="Digital Ocean"
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=48,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png 1x,https://image.typedream.net/cdn-cgi/image/width=96,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=96,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={48}
                            height={48}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slate-column_item _122mapi0"
                    style={{ width: "20%", widthFloat: "0.2" }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: "53.924123735387575px",
                          height: "53.924123735387575px",
                          aspectRatio: "53.924123735387575 / 53.924123735387575",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt="Google cloud platform"
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png 1x,https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={54}
                            height={54}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slate-column_item _122mapi0"
                    style={{ width: "20%", widthFloat: "0.2" }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: "55.18346260108768px",
                          height: "55.18346260108768px",
                          aspectRatio: "55.18346260108768 / 55.18346260108768",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt="linode"
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png 1x,https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={55}
                            height={55}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slate-column_item _122mapi0"
                    style={{ width: "20%", widthFloat: "0.2" }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: "52.96075739875391px",
                          height: "52.96075739875391px",
                          aspectRatio: "52.96075739875391 / 52.96075739875391",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt="openstack"
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png 1x,https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={53}
                            height={53}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <div
              className="slate-column _1j76um0"
              style={{ width: 1000, maxWidth: "min(100%, 1000px)" }}
            >
              <div className="_1j76um4 _1j76um1">
                <div
                  className="_1j76umd"
                  style={{ minHeight: 514, width: 1000, columnWidth: 1000 }}
                >
                  <div
                    className="slate-column_item _122mapi0"
                    style={{
                      width: "55.46052631578953%",
                      widthFloat: "0.5546052631578953"
                    }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{
                        justifyContent: "flex-start",
                        maxWidth: "min(100%, 700px)"
                      }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: "493.03254153160435px",
                          height: "248.05699745808846px",
                          aspectRatio: "493.03254153160435 / 248.05699745808846",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt=""
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=640,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png 1x,https://image.typedream.net/cdn-cgi/image/width=1080,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=1080,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={493}
                            height={248}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slate-column_item _122mapi0"
                    style={{
                      width: "44.539473684210506%",
                      widthFloat: "0.44539473684210507"
                    }}
                  >
                    <h3
                      className="slate-h3 ohgk4r3 ohgk4r0"
                      style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0">Cloud shell Environment</span>
                    </h3>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0">
                        <span style={{ color: "var(text-light)" }}>
                          with pre-installed dependencies and everything setup to Just
                          Work
                        </span>
                      </span>
                    </p>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0" />
                      <a
                        href="https://shalzz.gumroad.com/l/self-host-vpn"
                        rel="noreferrer"
                        target="_blank"
                        className="slate-a yk4y7v0"
                      >
                        <span className="_1untytp0">Learn more -&gt;</span>
                      </a>
                      <span className="_1untytp0" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <div
              className="slate-column _1j76um0"
              style={{ width: 1000, maxWidth: "min(100%, 1000px)" }}
            >
              <div className="_1j76um4 _1j76um1">
                <div
                  className="_1j76umd"
                  style={{ minHeight: 514, width: 1000, columnWidth: 1000 }}
                >
                  <div
                    className="slate-column_item _122mapi0"
                    style={{
                      width: "55.656765957446794%",
                      widthFloat: "0.556567659574468"
                    }}
                  >
                    <div
                      className="slate-img _10w3u1b0"
                      style={{ justifyContent: "center", maxWidth: "min(100%, 700px)" }}
                    >
                      <div
                        className="_10w3u1b1"
                        style={{
                          width: 700,
                          height: "124.32000000000001px",
                          aspectRatio: "700 / 124.32000000000001",
                          overflow: "hidden",
                          position: "relative"
                        }}
                      >
                        <div contentEditable="false">
                          <img
                            alt=""
                            srcSet="https://image.typedream.net/cdn-cgi/image/width=750,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png 1x,https://image.typedream.net/cdn-cgi/image/width=1920,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png 2x"
                            src="https://image.typedream.net/cdn-cgi/image/width=1920,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png"
                            decoding="async"
                            data-nimg={1}
                            className="_10w3u1b2"
                            loading="lazy"
                            style={{ color: "transparent" }}
                            width={700}
                            height={124}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slate-column_item _122mapi0"
                    style={{
                      width: "44.343234042553235%",
                      widthFloat: "0.4434323404255323"
                    }}
                  >
                    <h3
                      className="slate-h3 ohgk4r3 ohgk4r0"
                      style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0">
                        Wireguard protocol with clients for every platform
                      </span>
                    </h3>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0">
                        <span style={{ color: "var(text-light)" }}>
                          The VPN server runs on the Wireguard protocol and has clients
                          for every major platform including iOS, Android, MacOS,
                          Windows and Linux.
                        </span>
                      </span>
                    </p>
                    <p
                      className="slate-p _1vo7q450"
                      style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                    >
                      <span className="_1untytp0" />
                      <a
                        href="https://www.wireguard.com/install/"
                        rel="noreferrer"
                        target="_blank"
                        className="slate-a yk4y7v0"
                      >
                        <span className="_1untytp0">Learn more -&gt;</span>
                      </a>
                      <span className="_1untytp0" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <div
              role="none"
              className="mobile:hidden desktop:hidden _1bgwy4x2 slate-container _1bgwy4x9 _1bgwy4x0"
              style={{
                minHeight: "490.0000305175781px",
                width: "100%",
                maxWidth: "100%",
                background: "#000000"
              }}
            >
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)" }}
              >
                <span className="_1untytp0" />
              </p>
              <h3
                className="slate-h3 ohgk4r3 ohgk4r0"
                style={{
                  width: 600,
                  maxWidth: "min(100%, 700px)",
                  textAlign: "center"
                }}
              >
                <span className="_1untytp0">
                  <span style={{ color: "#ffffff" }}>
                    Enable API Access &amp; Integrations
                  </span>
                </span>
              </h3>
              <p
                className="slate-p _1vo7q450"
                style={{
                  width: 700,
                  maxWidth: "min(100%, 700px)",
                  textAlign: "center"
                }}
              >
                <span className="_1untytp0">
                  <span style={{ color: "#ffffff" }}>
                    Built with security and easy-of-use in mind.
                  </span>
                </span>
              </p>
              <div
                className="slate-column _1j76um0"
                style={{ width: 700, maxWidth: "min(100%, 700px)" }}
              >
                <div className="_1j76um4 _1j76um1">
                  <div
                    className="_1j76umd"
                    style={{ minHeight: 204, width: 700, columnWidth: 700 }}
                  >
                    <div
                      className="slate-column_item _122mapi0"
                      style={{ width: "50%", widthFloat: "0.5" }}
                    >
                      <div
                        role="none"
                        className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0"
                        style={{
                          minHeight: 148,
                          width: 300,
                          maxWidth: "min(100%, 700px)",
                          background: "#303045"
                        }}
                      >
                        <div
                          className="slate-button _1paom1l0"
                          style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                        >
                          <button
                            className="_1paom1l4 _1paom1l1 _1paom1l2"
                            style={{
                              background: "#6968F7",
                              color: "#ffffff",
                              boxShadow: "0 10px 20px -10px var(shadow-color-indigo)"
                            }}
                            type="button"
                          >
                            <div
                              className="_1paom1l5"
                              style={{ color: "#ffffff" }}
                              role="none"
                              contentEditable="false"
                            >
                              <i className="bx bxs-user" contentEditable="false" />
                            </div>
                            <span className="_1untytp0" />
                          </button>
                        </div>
                        <p
                          className="slate-p _1vo7q450"
                          style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                        >
                          <span className="_1untytp0">
                            <strong>
                              <span style={{ color: "#ffffff" }}>
                                List and Search Transactions
                              </span>
                            </strong>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="slate-column_item _122mapi0"
                      style={{ width: "50%", widthFloat: "0.5" }}
                    >
                      <div
                        role="none"
                        className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0"
                        style={{
                          minHeight: 148,
                          width: 300,
                          maxWidth: "min(100%, 700px)",
                          background: "#303045"
                        }}
                      >
                        <div
                          className="slate-button _1paom1l0"
                          style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                        >
                          <button
                            className="_1paom1l4 _1paom1l1 _1paom1l2"
                            style={{
                              background: "#6968F7",
                              color: "#ffffff",
                              boxShadow: "0 10px 20px -10px var(shadow-color-indigo)"
                            }}
                            type="button"
                          >
                            <div
                              className="_1paom1l5"
                              style={{ color: "#ffffff" }}
                              role="none"
                              contentEditable="false"
                            >
                              <i
                                className="bx bxs-credit-card"
                                contentEditable="false"
                              />
                            </div>
                            <span className="_1untytp0" />
                          </button>
                        </div>
                        <p
                          className="slate-p _1vo7q450"
                          style={{ width: 700, maxWidth: "min(100%, 700px)" }}
                        >
                          <span className="_1untytp0">
                            <strong>
                              <span style={{ color: "#ffffff" }}>Manage Payments</span>
                            </strong>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="slate-p _1vo7q450"
                style={{
                  width: 700,
                  maxWidth: "min(100%, 700px)",
                  textAlign: "center"
                }}
              >
                <span className="_1untytp0" />
                <a href="index.html" rel="noreferrer" className="slate-a yk4y7v0">
                  <span className="_1untytp0">
                    <span style={{ color: "#5E5DF0" }}>
                      Check the documentation -&gt;
                    </span>
                  </span>
                </a>
                <span className="_1untytp0" />
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{
                  width: 700,
                  maxWidth: "min(100%, 700px)",
                  textAlign: "center"
                }}
              >
                <span className="_1untytp0">
                  <span style={{ color: "#5E5DF0" }} />
                </span>
              </p>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <div
              role="none"
              className="_1bgwy4x2 card slate-container _1bgwy4x9 _1bgwy4x0"
              style={{ minHeight: 303, width: 900, maxWidth: "min(100%, 900px)" }}
            >
              <div className="_1bgwy4xb" contentEditable="false">
                <img
                  alt="background"
                  sizes="100vw"
                  srcSet="https://image.typedream.net/cdn-cgi/image/width=640,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png  640w,https://image.typedream.net/cdn-cgi/image/width=750,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png  750w,https://image.typedream.net/cdn-cgi/image/width=828,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png  828w,https://image.typedream.net/cdn-cgi/image/width=1080,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1080w,https://image.typedream.net/cdn-cgi/image/width=1200,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1200w,https://image.typedream.net/cdn-cgi/image/width=1920,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 1920w,https://image.typedream.net/cdn-cgi/image/width=2048,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 2048w,https://image.typedream.net/cdn-cgi/image/width=3840,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png 3840w"
                  src="https://image.typedream.net/cdn-cgi/image/width=3840,quality=100/https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    objectFit: "cover",
                    objectPosition: "center",
                    color: "transparent"
                  }}
                />
              </div>
              <h3
                className="slate-h3 ohgk4r3 ohgk4r0"
                style={{ width: 700, maxWidth: "min(100%, 700px)" }}
              >
                <span className="_1untytp0">
                  <span style={{ color: "#ffffff" }} className={inter.className}>
                    Deploy your own VPN server with exclusive access and control.
                  </span>
                </span>
              </h3>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)" }}
              >
                <span className="_1untytp0">
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      mobileFontSize: 16,
                      lineHeight: "1.4",
                      mobileLineHeight: 21
                    }}
                  >
                    It takes less than 15 minutes.
                  </span>
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)" }}
              >
                <span className="_1untytp0">
                  <span style={{ color: "#ffffff" }} />
                </span>
              </p>
              <div
                className="slate-button _1paom1l0"
                style={{ width: 700, maxWidth: "min(100%, 700px)" }}
              >
                <a href="https://shalzz.gumroad.com/l/self-host-vpn" rel="noreferrer">
                  <button
                    className="_1paom1l4 _1paom1l1 _1paom1l2"
                    style={{
                      background: "#fff",
                      color: "#6968F7",
                      boxShadow: "0 10px 20px -10px rgba(0,0,0,.09)"
                    }}
                    type="button"
                  >
                    <div />
                    <span className="_1untytp0">Get Started Now -&gt;</span>
                  </button>
                </a>
              </div>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)" }}
            >
              <span className="_1untytp0" />
            </p>
            <div
              role="none"
              className="_1bgwy4x2 slate-container _1bgwy4x9 _1bgwy4x0"
              style={{
                minHeight: "auto",
                width: "100%",
                maxWidth: "100%",
                background: "var(background)"
              }}
            >
              <p
                className="slate-p _1vo7q450"
                style={{
                  width: 700,
                  maxWidth: "min(100%, 700px)",
                  textAlign: "center"
                }}
              >
                <span className="_1untytp0">
                  <span
                    style={{
                      color: "var(text-light)",
                      fontSize: 20,
                      mobileFontSize: 16,
                      lineHeight: "1.4",
                      mobileLineHeight: 21
                    }}
                  >
                    Why deploy your own VPN Server?
                  </span>
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  VPNs have become a requirement in many countries and for many
                  professionals across countries to be able to do their work and
                  maintain a level of safely and anonymity that's increasing disparate
                  with the modern internet.
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  However VPN services provided by centralized VPN providers just shifts
                  the responsibility of maintaining user privacy and safely from
                  decentralized ISP's to centralized entities.
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  Many VPN providers still record logs of their users, either knowing or
                  unknowing for the purposes of having an analytical and billing system.
                  As we have seen time and time again, it is this meta data that many of
                  these centralized entities can be force to hand over and can
                  successfully be used to reconstruct online activity and user identity.
                  More over they often provide a degraded user experience by way of
                  having shared "public" servers that many users are routed through to
                  the open internet simultaneously.
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  With the proliferation and scale of cloud computing providers that
                  provide the raw resources of a VPN server across geo-locations, it no
                  longer makes sense to pay a specialized service provider for general
                  resources with unit economics with just a software slapped on top.
                  Especially when the software that does most of the heavy lifting is an
                  Free and Open Source Software.
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  While it does take some expertise to deploy you own VPN server
                  solution on a cloud provider, it is a one time cost that truly
                  provides the benefits of a VPN server and keeps you in control of your
                  privacy and data across multiple levels of the infrastructure.
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  Automation and abstraction continue to make it possible to deploy your
                  own server without increasing expertise and domain knowledge for a
                  wider group of users.
                </span>
              </p>
              <p
                className="slate-p _1vo7q450"
                style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
              >
                <span className="_1untytp0">
                  SelfVPN is my attempt at providing a set of tools and guides that lets
                  anyone DIY their own VPN server while maintaining ownership and
                  sovereignty of their data and identity.{" "}
                </span>
              </p>
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
            >
              <span className="_1untytp0" />
            </p>
            <div
              className="slate-divider c7sewk0"
              style={{ maxWidth: "100%", width: 1700 }}
            >
              <hr className="c7sewk1" contentEditable="false" />
            </div>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
            >
              <span className="_1untytp0" />
            </p>
            <p
              className="slate-p _1vo7q450"
              style={{ width: 700, maxWidth: "min(100%, 700px)", textAlign: "left" }}
            >
              <span className="_1untytp0" />
            </p>
          </div>
      </main>
    </>
  )
}
