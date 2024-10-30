export const Education = () => {
    return (
        <section className="flex scroll-mt-12 flex-col gap-x-8 gap-y-2 pb-52 font-inter lg:scroll-mt-48 xl:mt-32" id="education">
          <h2 className="mt-4 text-center font-inter text-3xl font-medium lg:text-left">
            Educational Background🎓
          </h2>
        <div>
          <div className="group relative py-6 pl-8 sm:pl-32">
              <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-slate-300 before:px-px after:absolute after:left-2 after:box-content after:size-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50 after:bg-[#393042] group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
                  <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold uppercase text-emerald-600 dark:bg-emerald-600 dark:text-emerald-100 sm:absolute sm:mb-0">2018 - 2023</time>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-200">Secondary & High School</div>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[#313638] dark:text-[#e0e0e0]"><a href="https://psuwit.ac.th/">PSU.Wittayanusorn School</a></span>
                  <span className="text-[#525a5e] dark:text-[#b7bfc4]">Hat Yai, Thailand</span>
              </div>
          </div>
          <div className="group relative py-6 pl-8 sm:pl-32">
              <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-slate-300 before:px-px after:absolute after:left-2 after:box-content after:size-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50 after:bg-[#393042] group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
                  <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold uppercase text-emerald-600 dark:bg-emerald-600 dark:text-emerald-100 sm:absolute sm:mb-0">present</time>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-200">Bachelor&apos;s degree (current)</div>
              </div>
              <div className="flex flex-col">
                  <span className="font-medium text-[#313638] dark:text-[#e0e0e0]"><a href="https://kmutt.ac.th/">King Mongkut&apos;s University of Technology Thonburi</a></span>
                  <span className="text-[#525a5e] dark:text-[#b7bfc4]"><a href="https://www.cpe.kmutt.ac.th/en/">B.Eng, Computer Engineering</a></span>
                  <span className="text-[#525a5e] dark:text-[#b7bfc4]">Bangkok, Thailand</span>
              </div>
          </div>
        </div>
      </section>
    )
}