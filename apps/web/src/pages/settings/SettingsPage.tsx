import { useTranslation } from 'react-i18next'

export function SettingsPage() {
  const { t, i18n } = useTranslation()
  const lng = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">{t('settings.pageTitle')}</h1>
        <p className="text-on-surface-variant">{t('settings.pageSubtitle')}</p>
      </header>

      <div className="space-y-16">
        <section className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
          <h2 className="text-lg font-bold mb-1">{t('language.title')}</h2>
          <p className="text-sm text-on-surface-variant mb-4">{t('language.description')}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void i18n.changeLanguage('ko')}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                lng === 'ko'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-container-highest border-outline-variant/20 text-on-surface hover:border-primary/40'
              }`}
            >
              {t('language.ko')}
            </button>
            <button
              type="button"
              onClick={() => void i18n.changeLanguage('es')}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                lng === 'es'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-container-highest border-outline-variant/20 text-on-surface hover:border-primary/40'
              }`}
            >
              {t('language.es')}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-2">{t('settings.publicIdentity')}</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{t('settings.publicIdentityHint')}</p>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8 p-6 bg-surface-container-low rounded-xl">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM3fv-gm3NAa_iowxgmhNSOcCx6l9Mmqg42YX8PjawP_P4TDneF_JStzJYehLrla5Q5HepHIEZS8uHehDA_ojS_cHVnDjbyfoxYTYhqNCK5uJR_YTfF7JZULnPai9Rono3PI0RMEJxAKAv8DJxqc32mLR3s-aKEWJzdfs9ShUNbszWbXL9C7oA0QhVG3_4ThmEffek1dDgAG_zz4d2GCDI_zOmawuOPmZr3YOpxpews01QV_cAfuLKP8FgpS5KURoaLjIpkYj6mZM"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-1">{t('settings.profilePhoto')}</h3>
                <p className="text-xs text-on-surface-variant mb-3">{t('settings.photoHint')}</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                  >
                    {t('settings.uploadNew')}
                  </button>
                  <button
                    type="button"
                    className="text-xs font-bold uppercase tracking-widest text-error hover:underline"
                  >
                    {t('settings.remove')}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  {t('settings.fullName')}
                </label>
                <input
                  className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 px-4 py-3 rounded-t-lg focus:ring-0 focus:border-primary transition-all bg-white"
                  type="text"
                  defaultValue="Alex Rivera"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  {t('settings.publicUsername')}
                </label>
                <input
                  className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 px-4 py-3 rounded-t-lg focus:ring-0 focus:border-primary transition-all bg-white"
                  type="text"
                  defaultValue="arivera_affiliate"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  {t('settings.shortBio')}
                </label>
                <textarea
                  className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 px-4 py-3 rounded-t-lg focus:ring-0 focus:border-primary transition-all bg-white resize-none"
                  rows={4}
                  defaultValue="AI-driven affiliate strategist specializing in SaaS and Fintech growth. Leveraging automation to scale high-ticket partnerships across global markets."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-2">{t('settings.connectivity')}</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{t('settings.connectivityHint')}</p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">link</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase text-on-surface-variant tracking-tighter">
                  {t('settings.personalWebsite')}
                </div>
                <div className="text-sm font-medium">alexrivera.io</div>
              </div>
              <button type="button" className="text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                <span className="material-symbols-outlined">share</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase text-on-surface-variant tracking-tighter">
                  {t('settings.linkedin')}
                </div>
                <div className="text-sm font-medium">in/arivera-ai</div>
              </div>
              <button type="button" className="text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined">video_library</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase text-on-surface-variant tracking-tighter">
                  {t('settings.youtubeChannel')}
                </div>
                <div className="text-sm font-medium text-outline">{t('settings.notConnected')}</div>
              </div>
              <button type="button" className="text-primary font-bold text-xs uppercase tracking-widest">
                {t('settings.connect')}
              </button>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
                <span className="material-symbols-outlined">terminal</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase text-on-surface-variant tracking-tighter">
                  {t('settings.github')}
                </div>
                <div className="text-sm font-medium">arivera-dev</div>
              </div>
              <button type="button" className="text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>
        </section>

        <section className="p-8 bg-surface-container-low rounded-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('settings.accountIntegrity')}</h2>
              <div className="flex gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-xs font-bold text-outline uppercase tracking-widest mb-1">
                    {t('settings.trustScore')}
                  </div>
                  <div className="text-3xl font-black text-secondary">
                    98<span className="text-lg font-normal">/100</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-xs font-bold text-outline uppercase tracking-widest mb-1">
                    {t('settings.affiliateTier')}
                  </div>
                  <div className="text-3xl font-black text-primary">GOLD</div>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-sm">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span className="text-sm">{t('settings.editorialInsight')}</span>
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant">{t('settings.insightBody')}</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </section>

        <div className="pt-8 flex justify-end items-center gap-4 border-t border-surface-container-highest">
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {t('settings.discard')}
          </button>
          <button
            type="button"
            className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
          >
            {t('settings.save')}
          </button>
        </div>
      </div>
    </div>
  )
}
