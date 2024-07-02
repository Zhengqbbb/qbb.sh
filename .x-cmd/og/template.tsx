// @ts-nocheck
import React from 'react'
import Meta from '~/meta'

export default (
    title = Meta.title,
    desc = Meta.description,
    site = Meta.siteShort,
) => {
    const backgroundColor = '#0a0a0a'
    const bgBorderStyle = `1px dashed #3b3b3b`
    const borderTop = bgBorderStyle
    const borderRight = bgBorderStyle
    const borderLeft = bgBorderStyle
    const bgBorderLen = 8
    const bgLeftMask = ` linear-gradient(to top left , ${backgroundColor} 50% , transparent 70%, ${backgroundColor} 89%, transparent 90%, transparent 100%  )`
    const bgRightMask = `linear-gradient(to top right, ${backgroundColor} 50% , transparent 70%, ${backgroundColor} 89%, transparent 90%, transparent 100%  )`

    return (
        <div
            style={{ backgroundColor }}
            tw="relative flex flex-col w-full h-full items-center justify-between text-neutral-200 px-2rem py-2rem text-1.4rem"
        >
            <div tw="flex absolute h-auto w-full">
                <div tw="flex flex-col absolute left--2rem top-0 h-auto w-1/2">
                    <div tw="flex relative h-[30px] w-full flex h-[60px]">
                        <div tw="w-66px h-66px" style={{ backgroundColor }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                    </div>
                    {
                        Array(bgBorderLen).fill(null).map((_, idx) => (
                            <div tw="flex relative h-[30px] w-full flex h-[60px]" key={`left-${idx}`}>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                            </div>
                        ))
                    }
                    <div tw="flex relative h-[30px] w-full flex h-[60px]">
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop, borderRight }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                    </div>
                    <div
                        tw="absolute flex top-0 left-0 right-0 bottom-0 w-full"
                        style={{ backgroundImage: bgLeftMask }}
                    >
                    </div>
                </div>
                <div tw="flex flex-col absolute right--4.5rem top-0 h-auto w-1/2">
                    <div tw="flex relative h-[30px] w-full flex h-[60px]">
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft }}></div>
                    </div>
                    {
                        Array(bgBorderLen).fill(null).map((_, idx) => (
                            <div tw="flex relative h-[30px] w-full flex h-[60px]" key={`right-${idx}`}>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                                <div tw="w-66px h-66px" style={{ backgroundColor, borderLeft, borderTop }}></div>
                            </div>
                        ))
                    }
                    <div tw="flex relative h-[30px] w-full flex h-[60px]">
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop }}></div>
                        <div tw="w-66px h-66px" style={{ backgroundColor, borderTop, borderLeft }}></div>
                    </div>
                    <div
                        tw="absolute flex top-0 left-0 right-0 bottom--0 w-full"
                        style={{ backgroundImage: bgRightMask }}
                    >
                    </div>
                </div>
            </div>

            <div tw="flex w-full">
                <svg height="72" viewBox="0 0 24 24">
                    <defs>
                        <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="19.78" x2="10.749" y1="11.04" y2="20.16">
                            <stop offset="0" stop-color="#fff" />
                            <stop offset="1" stop-color="#ababab" />
                        </linearGradient>
                        <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="13.669" x2="7.911" y1="2.441" y2="19.191">
                            <stop offset="0" stop-color="#fff" />
                            <stop offset="1" stop-color="#ababab" />
                        </linearGradient>
                        <clipPath id="a"><path d="M6.621 6.548h16.145v19H6.621z" /></clipPath>
                        <clipPath id="c"><path d="M0-4.236h15.108v30H0z" /></clipPath>
                    </defs>
                    <path clip-path="url(#a)" d="M15.105 12.55c.019.115.04.266.065.453.024.188.036.382.036.583 0 .442-.063.867-.188 1.275a3.145 3.145 0 0 1-.568 1.08c-.255.312-.57.56-.944.742-.374.182-.81.273-1.31.273-.365 0-.691-.06-.98-.18a2.018 2.018 0 0 1-.726-.504 2.242 2.242 0 0 1-.454-.77 2.909 2.909 0 0 1-.158-.98c0-.527.11-1.027.33-1.497.222-.47.52-.902.894-1.296a7.225 7.225 0 0 1 1.303-1.073 9.111 9.111 0 0 1 1.562-.814 9.933 9.933 0 0 1 1.678-.51 7.955 7.955 0 0 1 1.634-.18 8.9 8.9 0 0 1 1.8.172 9.242 9.242 0 0 1 1.642.504c.374-.163.756-.312 1.145-.446.388-.135.79-.211 1.202-.23l.029.086c-.135 0-.298.024-.49.072a5.368 5.368 0 0 0-1.138.44c-.172.09-.302.179-.388.265.365.211.657.483.878.814.221.331.331.713.331 1.145 0 .412-.103.765-.31 1.058a2.706 2.706 0 0 1-.777.735 4.13 4.13 0 0 1-1.022.46 9.04 9.04 0 0 1-1.059.252l-.014.03c.298.037.588.083.871.136.283.053.538.142.763.266.226.125.406.3.54.526.135.226.202.526.202.9a3.02 3.02 0 0 1-.338 1.433c-.226.427-.526.79-.9 1.087a4.143 4.143 0 0 1-1.268.684c-.47.158-.95.238-1.44.238a2.54 2.54 0 0 1-.619-.08 1.949 1.949 0 0 1-.569-.237 1.394 1.394 0 0 1-.417-.404 1.003 1.003 0 0 1-.166-.575.91.91 0 0 1 .26-.649.84.84 0 0 1 .633-.273c.288 0 .542.096.763.288a1.11 1.11 0 0 0-.425.432 1.215 1.215 0 0 0-.136.576c0 .25.067.437.201.562.135.124.327.187.576.187a1.8 1.8 0 0 0 1.023-.31c.307-.206.566-.465.777-.777.211-.313.375-.656.49-1.03.115-.375.173-.73.173-1.066 0-.633-.166-1.096-.497-1.39-.331-.292-.843-.438-1.534-.438l.015-.116a4.18 4.18 0 0 0 1.05-.194 3.09 3.09 0 0 0 .93-.475c.273-.207.496-.466.67-.778.172-.312.258-.684.258-1.116 0-.269-.048-.526-.144-.77a1.622 1.622 0 0 0-.46-.641 5.97 5.97 0 0 0-1.296 1.483c-.384.605-.766 1.25-1.145 1.937-.38.686-.775 1.377-1.188 2.073a10.54 10.54 0 0 1-1.419 1.887 6.595 6.595 0 0 1-1.85 1.368c-.7.35-1.526.526-2.477.526-.307 0-.607-.041-.9-.123a2.61 2.61 0 0 1-.785-.36 1.969 1.969 0 0 1-.561-.583 1.463 1.463 0 0 1-.216-.792c0-.279.074-.518.223-.72.149-.202.377-.303.684-.303.22 0 .396.068.526.202s.194.302.194.504a.654.654 0 0 1-.173.46c-.115.126-.23.198-.345.217a.768.768 0 0 0-.015.173c0 .393.127.684.382.87.254.188.626.282 1.116.282.653 0 1.226-.178 1.72-.533a6.052 6.052 0 0 0 1.361-1.39c.413-.57.812-1.21 1.196-1.915.384-.706.794-1.406 1.23-2.102.438-.696.925-1.354 1.462-1.973a6.578 6.578 0 0 1 1.887-1.505 3.807 3.807 0 0 0-1.325-.655c-.5-.14-.994-.209-1.483-.209a6.76 6.76 0 0 0-2.117.36c-.73.24-1.394.588-1.994 1.044a5.73 5.73 0 0 0-1.476 1.656c-.384.648-.576 1.38-.576 2.196 0 .23.03.47.093.72s.161.478.295.684c.135.207.303.377.504.511.202.135.437.202.706.202a1.97 1.97 0 0 0 1-.252c.294-.168.546-.394.757-.677a3.11 3.11 0 0 0 .482-.98c.11-.369.166-.75.166-1.144 0-.23-.01-.43-.029-.598a46.06 46.06 0 0 0-.058-.482l.159-.014Z" fill="url(#b)" />
                    <path clip-path="url(#c)" d="M15.108 12.625c-.154.252-.333.518-.536.798-.202.28-.43.532-.682.756-.252.224-.522.41-.809.557-.287.147-.591.22-.913.22-.35 0-.707-.105-1.071-.315-.252-.14-.48-.35-.682-.63a7.12 7.12 0 0 1-.546-.882 17.7 17.7 0 0 1-.441-.903 7.872 7.872 0 0 0-.347-.693c-.322.112-.64.196-.955.252a5.448 5.448 0 0 1-.956.084c-.462 0-.928-.056-1.396-.168a2.576 2.576 0 0 1-1.208-.65 5.65 5.65 0 0 0-.798.671 7.048 7.048 0 0 0-.693.798c-.07 0-.105-.049-.105-.147.238-.28.48-.539.724-.777a7.4 7.4 0 0 1 .767-.65c-.448-.49-.672-1.1-.672-1.828 0-.448.087-.913.262-1.396.175-.483.4-.956.672-1.418.274-.462.571-.9.893-1.312.322-.413.637-.767.945-1.06a5.3 5.3 0 0 1 3.675-1.513c.07 0 .115.014.136.042a.14.14 0 0 1 .032.084c0 .042-.014.063-.042.063a.973.973 0 0 0-.189-.02h-.147c-.336 0-.672.08-1.008.24a4.53 4.53 0 0 0-.945.61c-.294.245-.56.504-.798.777s-.441.514-.609.724c-.196.266-.403.574-.62.924-.216.35-.416.718-.598 1.103a7.648 7.648 0 0 0-.452 1.218 4.79 4.79 0 0 0-.178 1.291c0 .364.07.721.21 1.071.476-.322.931-.535 1.365-.64.434-.105.791-.158 1.071-.158.154 0 .318.01.493.032.176.02.361.073.557.157.196.084.399.214.609.389.21.175.42.416.63.724a4.999 4.999 0 0 0 1.386-1.04 7.732 7.732 0 0 0 1.785-3.076c.168-.56.252-1.085.252-1.575 0-.448-.053-.864-.158-1.25a2.497 2.497 0 0 0-.472-.955 1.746 1.746 0 0 0-.388-.325 1.35 1.35 0 0 0-.41-.179c-.07-.028-.105-.049-.105-.063 0-.028.035-.042.105-.042.112 0 .245.004.399.01.154.008.294.011.42.011.084 0 .178.01.284.032a.63.63 0 0 1 .283.136c.21.168.413.417.609.746s.294.794.294 1.396c0 .42-.077.914-.231 1.48a7.43 7.43 0 0 1-.735 1.733A8.669 8.669 0 0 1 11.78 9.79a6.94 6.94 0 0 1-1.922 1.386c.084.126.182.29.294.494.112.203.238.42.378.65.14.232.294.466.462.704.168.238.343.462.525.672.406.462.826.693 1.26.693.084 0 .203-.014.357-.042.154-.028.325-.101.514-.22.19-.12.396-.305.62-.557.224-.252.448-.602.672-1.05.028-.042.063-.049.105-.02.042.027.063.07.063.125Zm-6.111-1.239-.304-.472a2.253 2.253 0 0 0-.378-.441 1.8 1.8 0 0 0-.525-.326 1.952 1.952 0 0 0-.746-.126c-.35 0-.686.06-1.008.179a4.965 4.965 0 0 0-.945.472c.238.392.574.658 1.008.798.434.14.861.21 1.281.21.532 0 1.071-.098 1.617-.294Z" fill="url(#d)" />
                </svg>
            </div>

            <div tw="w-full flex relative mt--20 px-30 flex-col justify-center items-center">
                <div tw="text-2.8rem font-bold text-white" style={{ whiteSpace: 'pre-wrap' }}>
                    {title}
                </div>
                <div tw="text-1.6rem text-neutral-400 mt-4" style={{ whiteSpace: 'pre-wrap' }}>
                    {desc}
                </div>
            </div>

            <div tw="w-full flex items-center justify-end">
                <div tw="flex items-center text-zinc-500 text-1.2rem">
                    <span tw="text-neutral-500 border-b border-neutral-400 ml-2">
                        {site}
                    </span>
                    <svg tw="mx-2" fill="white" height="20" viewBox="0 0 256 366">
                        <path d="M182.022 9.147c2.982 3.702 4.502 8.697 7.543 18.687L256 246.074a276.467 276.467 0 0 0-79.426-26.891L133.318 73.008a5.63 5.63 0 0 0-10.802.017L79.784 219.11A276.453 276.453 0 0 0 0 246.04L66.76 27.783c3.051-9.972 4.577-14.959 7.559-18.654a24.541 24.541 0 0 1 9.946-7.358C88.67 0 93.885 0 104.314 0h47.683c10.443 0 15.664 0 20.074 1.774a24.545 24.545 0 0 1 9.95 7.373" />
                        <path fill="#FF5D01" d="M189.972 256.46c-10.952 9.364-32.812 15.751-57.992 15.751c-30.904 0-56.807-9.621-63.68-22.56c-2.458 7.415-3.009 15.903-3.009 21.324c0 0-1.619 26.623 16.898 45.14c0-9.615 7.795-17.41 17.41-17.41c16.48 0 16.46 14.378 16.446 26.043l-.001 1.041c0 17.705 10.82 32.883 26.21 39.28a35.685 35.685 0 0 1-3.588-15.647c0-16.886 9.913-23.173 21.435-30.48c9.167-5.814 19.353-12.274 26.372-25.232a47.588 47.588 0 0 0 5.742-22.735c0-5.06-.786-9.938-2.243-14.516" />
                    </svg>
                    <span>Powered by Astro ✘ QB</span>
                </div>
            </div>
        </div>
    )
}
