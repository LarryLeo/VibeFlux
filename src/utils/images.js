const parseHTML = (htmlString) => {
  return new DOMParser().parseFromString(htmlString, "text/html")
}

export const extractImageSources = (htmlOrDoc) => {
  const doc = typeof htmlOrDoc === "string" ? parseHTML(htmlOrDoc) : htmlOrDoc
  const images = doc.querySelectorAll("img")
  return [...images]
    .map((img) => {
      const src = img.getAttribute("src")
      const width = Number.parseInt(img.getAttribute("width") || "", 10)
      const height = Number.parseInt(img.getAttribute("height") || "", 10)
      const rawSrcSet = img.getAttribute("srcset")

      const srcSet = rawSrcSet
        ? rawSrcSet
            .split(",")
            .map((entry) => entry.trim())
            .map((entry) => {
              const match = entry.match(/^(.*?)\s+(\d+(?:\.\d+)?)(w|x)$/)
              if (!match) {
                return null
              }

              const candidateSrc = match[1].trim()
              const descriptorValue = Number.parseFloat(match[2])
              const descriptorType = match[3]

              if (descriptorType === "w") {
                if (!width || !height) {
                  return null
                }

                const candidateWidth = descriptorValue
                return {
                  height: Math.round((height / width) * candidateWidth),
                  src: candidateSrc,
                  width: candidateWidth,
                }
              }

              if (!width || !height) {
                return null
              }

              return {
                height: Math.round(height * descriptorValue),
                src: candidateSrc,
                width: Math.round(width * descriptorValue),
              }
            })
            .filter(Boolean)
        : undefined

      return {
        src,
        srcSet: srcSet?.length ? srcSet : undefined,
      }
    })
    .filter((image) => image.src)
}

const getWeiboFirstImage = (docs) => {
  const allImages = [...docs.querySelectorAll("img")]
  const filteredImages = allImages.filter((img) => {
    return !img.closest("a") && !(img.hasAttribute("alt") && /\[.+]/.test(img.getAttribute("alt")))
  })
  return filteredImages.length > 0 ? filteredImages[0] : null
}

const findMediaEnclosure = (enclosures) => {
  return enclosures?.find(
    (enclosure) =>
      enclosure.url !== "" &&
      (enclosure.mime_type.startsWith("video/") || enclosure.mime_type.startsWith("audio/")),
  )
}

const findImageEnclosure = (enclosures) => {
  return enclosures?.find(
    (enclosure) =>
      enclosure.mime_type.toLowerCase().startsWith("image/") ||
      /\.(jpg|jpeg|png|gif)$/i.test(enclosure.url),
  )
}

export const parseCoverImage = (entry) => {
  const doc = parseHTML(entry.content)
  const isWeiboFeed =
    entry.feed?.site_url && /https:\/\/weibo\.com\/\d+\//.test(entry.feed.site_url)

  // Get the first image
  const firstImage = isWeiboFeed ? getWeiboFirstImage(doc) : doc.querySelector("img")

  let coverSource = firstImage?.getAttribute("src")
  let isMedia = false
  let mediaPlayerEnclosure = null

  // If no cover image is found, try to get from other sources
  if (!coverSource) {
    // Check video poster
    const video = doc.querySelector("video")
    if (video) {
      coverSource = video.getAttribute("poster")
      isMedia = true
    } else {
      // Check media attachments
      mediaPlayerEnclosure = findMediaEnclosure(entry.enclosures)
      isMedia = !!mediaPlayerEnclosure

      // Check image attachments
      const imageEnclosure = findImageEnclosure(entry.enclosures)
      if (imageEnclosure) {
        coverSource = imageEnclosure.url
      }
    }

    // Check iframe
    if (!isMedia) {
      const iframe = doc.querySelector("iframe")
      const iframeHost = iframe?.getAttribute("src")?.split("/")[2]
      isMedia = !!iframeHost
    }
  }

  return { ...entry, coverSource, mediaPlayerEnclosure, isMedia }
}
