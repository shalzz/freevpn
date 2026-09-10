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
      <main style={inter.style} className="min-h-screen overflow-x-hidden bg-white text-black">
        <div className="flex flex-col items-center justify-start">
          <div className="h-[70px]" />

          <header className="w-full max-md:px-5">
            <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center md:flex-row md:items-stretch md:justify-start">
              <div className="flex w-full flex-col items-start justify-center py-[20px] md:w-[45.936%]">
                <h1 className="w-full py-[28px] text-left text-[40px] font-extrabold leading-[1.1] tracking-[-2.5px] md:text-[56px] md:leading-[1.125]">
                  Own your VPN. No provider logs, no{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #6699FF 0%, #FF3366 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    $12/mo
                  </span>
                  .
                </h1>
                <p className="w-full py-[4px] text-left text-[16px] leading-[1.5] text-muted">
                  SelfVPN deploys a private <strong className="font-bold">WireGuard</strong> server <em>you</em> control on a cloud provider of your choice. Your traffic never passes through a commercial VPN's logs — because there's no VPN company in the middle.
                </p>
                <div className="w-full py-[4px]">
                  <a href="https://shalzz.gumroad.com/l/self-host-vpn" rel="noreferrer" className="block">
                    <button
                      type="button"
                      style={{
                        background: "linear-gradient(135deg, #6699FF 0%, #FF3366 100%)",
                        color: "#ffffff",
                        boxShadow: "0 10px 20px -10px #b664b0"
                      }}
                      className="my-[10px] flex items-center justify-center rounded-full px-5 py-3"
                    >
                      <strong className="font-bold">Deploy your private VPN in 15 mins</strong>
                    </button>
                  </a>
                </div>
                <p className="w-full py-[4px] text-center text-[16px] leading-[1.5] text-muted">
                  <strong className="font-bold">★★★★★ 5 / 5 Rating (From 1 user)</strong>
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-center py-[20px] md:w-[54.064%]">
                <div className="mx-auto flex w-full max-w-full flex-row items-stretch md:max-w-[704px]">
                  <video
                    playsInline
                    loop
                    autoPlay
                    muted
                    className="block h-auto w-full"
                  >
                    <source
                      src="https://jain.sh/static/freevpn-algo-x3-take8.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>
          </header>

          <section aria-label="Supported cloud providers" className="w-full max-md:px-5">
            <div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
              <p className="w-full py-[4px] text-center text-[16px] leading-[21px] text-ink md:text-[20px] md:leading-[1.4]">
                Support for 10+ cloud providers
              </p>
              <p className="w-full py-[4px] text-center text-[16px] leading-[1.5] text-muted">
                Stop renting trust from a logging VPN provider. Own the server instead.
              </p>
              <div className="flex w-full flex-col items-center justify-center md:flex-row md:flex-wrap md:justify-center">
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[5px] md:w-[20%] md:py-[20px]">
                  <div className="flex w-full justify-center">
                    <img
                      alt="Amazon Web Services"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOmslX4LWUo4ZmUZxUC2eoNymt_icons8-amazon-web-services-64.png"
                      decoding="async"
                      loading="lazy"
                      width={51}
                      height={51}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[5px] md:w-[20%] md:py-[20px]">
                  <div className="flex w-full justify-center">
                    <img
                      alt="Digital Ocean"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=48,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=96,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=96,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnJGUGH97t0caI84BCcwobdHF_icons8-digital-ocean-96.png"
                      decoding="async"
                      loading="lazy"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[5px] md:w-[20%] md:py-[20px]">
                  <div className="flex w-full justify-center">
                    <img
                      alt="Google cloud platform"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOntb0SkwJlJf4qRLuYmnszlOX_icons8-google-cloud-platform-96.png"
                      decoding="async"
                      loading="lazy"
                      width={54}
                      height={54}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[5px] md:w-[20%] md:py-[20px]">
                  <div className="flex w-full justify-center">
                    <img
                      alt="linode"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOnvRjyFPUbDcNBFvAWd5wIEF5_icons8-linode-96.png"
                      decoding="async"
                      loading="lazy"
                      width={55}
                      height={55}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[5px] md:w-[20%] md:py-[20px]">
                  <div className="flex w-full justify-center">
                    <img
                      alt="openstack"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=64,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png 1x,https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=128,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LOo2kOYTDPgm9Re2w3IVGJfh4Z_icons8-openstack-96.png"
                      decoding="async"
                      loading="lazy"
                      width={53}
                      height={53}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-label="SelfVPN features" className="w-full max-md:px-5">
            <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
              <div className="flex w-full flex-col items-center justify-center md:flex-row md:flex-wrap md:items-center md:justify-center">
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[20px] md:w-[55.46%]">
                  <div className="flex w-full justify-center md:justify-start">
                    <img
                      alt="SelfVPN cloud-shell terminal screenshot"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=640,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png 1x,https://image.typedream.com/cdn-cgi/image/width=1080,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=1080,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPMwc4P6tuuycB5Y44tKQdI2nr_Screenshot_from_2022-11-22_18-14-30-cropped.png"
                      decoding="async"
                      loading="lazy"
                      width={493}
                      height={248}
                      className="block w-full max-w-[493px] object-contain"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-center px-[15px] py-[20px] md:w-[44.54%]">
                  <h3 className="w-full py-[13px] text-left text-[23px] font-bold leading-[1.1] tracking-[-0.5px] md:text-[26px] md:leading-[1.125]">
                    Cloud-shell environment
                  </h3>
                  <p className="w-full py-[4px] text-[16px] leading-[1.5] text-muted">
                    Pre-installed dependencies, everything set up to Just Work. You run one script; the VPN is yours.
                  </p>
                  <p className="w-full py-[4px] text-[16px] leading-[1.5]">
                    <a href="https://shalzz.gumroad.com/l/self-host-vpn" rel="noreferrer" target="_blank" className="no-underline text-accent hover:underline">
                      Learn more -&gt;
                    </a>
                  </p>
                </div>
              </div>

              <div className="h-[96px]" />

              <div className="flex w-full flex-col items-center justify-center md:flex-row md:flex-wrap md:items-center md:justify-center">
                <div className="flex w-full flex-col items-center justify-center px-[15px] py-[20px] md:w-[55.66%]">
                  <div className="flex w-full justify-center">
                    <img
                      alt="WireGuard VPN protocol logo"
                      srcSet="https://image.typedream.com/cdn-cgi/image/width=750,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png 1x,https://image.typedream.com/cdn-cgi/image/width=1920,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png 2x"
                      src="https://image.typedream.com/cdn-cgi/image/width=1920,quality=100/https://api.typedream.com/v0/document/public/d305e120-ec34-4df8-a081-0944c171e4dc/2LPj6UvbKDk9Abbc8zAViceKaIS_wireguard.png"
                      decoding="async"
                      loading="lazy"
                      width={700}
                      height={124}
                      className="block w-full max-w-[700px] object-contain"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-center px-[15px] py-[20px] md:w-[44.34%]">
                  <h3 className="w-full py-[13px] text-left text-[23px] font-bold leading-[1.1] tracking-[-0.5px] md:text-[26px] md:leading-[1.125]">
                    WireGuard protocol, clients for every platform
                  </h3>
                  <p className="w-full py-[4px] text-[16px] leading-[1.5] text-muted">
                    The server runs on WireGuard — clients for iOS, Android, macOS, Windows, and Linux.
                  </p>
                  <p className="w-full py-[4px] text-[16px] leading-[1.5]">
                    <a href="https://www.wireguard.com/install/" rel="noreferrer" target="_blank" className="no-underline text-accent hover:underline">
                      Learn more -&gt;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Get started" className="w-full max-md:px-5">
            <div className="relative mx-auto flex min-h-[303px] w-full max-w-[900px] flex-col items-center justify-center overflow-hidden rounded-[10px] px-[25px] py-[20px]" style={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}>
              <div className="absolute inset-0 overflow-hidden rounded-[10px]">
                <img
                  alt="background"
                  sizes="100vw"
                  src="https://typedream.sfo3.digitaloceanspaces.com/illustrations/gradients/gradient-1.png"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="relative z-10 w-full py-[13px] text-center text-[23px] font-bold leading-[1.1] tracking-[-0.5px] text-white md:max-w-[700px] md:text-[26px] md:leading-[1.125]">
                Deploy your own VPN server with exclusive access and control.
              </h3>
              <p className="relative z-10 w-full max-w-[700px] py-[4px] text-center text-[16px] leading-[21px] text-white md:text-[20px] md:leading-[1.4]">
                It takes less than 15 minutes.
              </p>
              <div className="relative z-10 flex w-full max-w-[700px] py-[4px]">
                <a href="https://shalzz.gumroad.com/l/self-host-vpn" rel="noreferrer" className="block">
                  <button
                    type="button"
                    style={{ background: "#ffffff", color: "#6968F7", boxShadow: "0 10px 20px -10px rgba(0, 0, 0, 0.09)" }}
                    className="my-[10px] flex items-center justify-center rounded-full px-5 py-3"
                  >
                    Get Started Now -&gt;
                  </button>
                </a>
              </div>
            </div>
          </section>

          <div className="h-[32px]" />

          <article aria-label="About SelfVPN" className="w-full bg-white max-md:px-5">
            <div className="mx-auto flex max-w-[700px] flex-col items-center">
              <p className="w-full py-[4px] text-center text-[16px] leading-[21px] text-muted md:text-[20px] md:leading-[1.4]">
                Why own your VPN server?
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                VPNs have become a requirement for many people to work and browse with a basic level of safety. But commercial VPN services simply shift your trust from your ISP to <em>them</em>.
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                Many VPN providers still record logs of their users — for analytics, billing, or because they were compelled to. As we've seen time and again, that metadata can be handed over and used to reconstruct your activity and identity. On top of that, you pay ~$12/month for shared "public" servers throttled by thousands of other users.
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                With cloud providers offering compute across geo-locations, it no longer makes sense to pay a specialized service for general resources with a thin software layer on top — especially when the engine (WireGuard) is free and open source.
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                SelfVPN lets anyone DIY their own VPN while keeping ownership and sovereignty of their data and identity.
              </p>
              <p className="w-full py-[4px] text-center text-[16px] leading-[21px] text-muted md:mt-[32px] md:text-[20px] md:leading-[1.4]">
                The honest picture
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                SelfVPN gives you <strong className="font-bold">provider-level privacy</strong>: no commercial VPN sitting between you and the internet, logging your activity. It is <strong className="font-bold">not</strong> magic anonymity — your cloud host and ISP still see that your server exists and when it's active, and the websites you visit still see your server's IP. What they <em>don't</em> get is a third party's record of everywhere you went. For most people escaping the "we don't log you (wink)" VPN industry, that's the whole point.
              </p>
              <p className="w-full py-[4px] text-center text-[16px] leading-[21px] text-muted md:mt-[32px] md:text-[20px] md:leading-[1.4]">
                Who this is for
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                - People done renting trust from logging VPN providers
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                - Privacy-conscious users who want ownership, not a subscription
              </p>
              <p className="w-full py-[4px] text-left text-[16px] leading-[1.5]">
                - Anyone comfortable running a script in a cloud shell (AI assistants like ChatGPT or Claude can walk you through each step)
              </p>
            </div>
          </article>

          <footer className="w-full">
            <hr className="my-[13px] h-px w-full border-none opacity-30 bg-[#929cad]" />
          </footer>
        </div>
      </main>
    </>
  )
}
