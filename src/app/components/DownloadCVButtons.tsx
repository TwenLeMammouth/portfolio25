type Props = {
  cvfrUrl?: string
  cvenUrl?: string
}

export default function DownloadCVButtons({ cvfrUrl, cvenUrl }: Props) {
  const download = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-row gap-2 md:gap-4 mt-0 md:mt-6 justify-center items-center">
      {cvfrUrl && (
        <button
          onClick={() => download(cvfrUrl, 'CV_Vincent_Groslier_FR.pdf')}
          className="bg-[#12DD88] hover:bg-white text-black hover:text-[#12DD88] text-sm font-bold p-2 md:py-3 md:px-6 rounded-md shadow-lg hover:shadow-[#12DD88]/50 transition-all duration-300"
        >
          Télécharger le CV 🇫🇷
        </button>
      )}
      {cvenUrl && (
        <button
          onClick={() => download(cvenUrl, 'CV_Vincent_Groslier_EN.pdf')}
          className="bg-[#12DD88] hover:bg-white text-black hover:text-[#12DD88] text-sm font-bold p-2 md:py-3 md:px-6 rounded-md shadow-lg hover:shadow-[#12DD88]/50 transition-all duration-300"
        >
          Download CV 🇬🇧
        </button>
      )}
    </div>
  )
}
