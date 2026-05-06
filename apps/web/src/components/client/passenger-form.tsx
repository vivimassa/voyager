'use client'

import { useT } from '@/i18n/use-t'
import type { Passenger, IdType } from '@/stores/cart-store'

const NATIONALITY_PRESETS: Array<{ code: string; label: string }> = [
  { code: 'VN', label: 'Việt Nam' },
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },
  { code: 'JP', label: 'Japan' },
  { code: 'KR', label: 'Korea' },
  { code: 'CN', label: 'China' },
  { code: 'TH', label: 'Thailand' },
  { code: 'SG', label: 'Singapore' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
]

export function PassengerForm({
  index,
  passenger,
  idType,
  onChange,
}: {
  index: number
  passenger: Passenger
  idType: IdType
  onChange: (patch: Partial<Passenger>) => void
}) {
  const t = useT()
  return (
    <fieldset className="rounded-xl border border-vg-border p-4">
      <legend className="px-2 text-[11px] font-bold text-vg-text uppercase tracking-wide">
        {t.passenger.legend(index + 1)}
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label={t.passenger.firstName} required>
          <input
            type="text"
            value={passenger.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={inputClass}
            maxLength={80}
          />
        </Field>
        <Field label={t.passenger.lastName} required>
          <input
            type="text"
            value={passenger.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={inputClass}
            maxLength={80}
          />
        </Field>
        <Field label={t.passenger.dob} required>
          <input
            type="date"
            value={passenger.dob}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => onChange({ dob: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label={t.passenger.nationality} required>
          <select
            value={passenger.nationality || ''}
            onChange={(e) => onChange({ nationality: e.target.value })}
            className={inputClass}
          >
            <option value="">{t.passenger.nationalityPlaceholder}</option>
            {NATIONALITY_PRESETS.map((n) => (
              <option key={n.code} value={n.code}>
                {n.code} · {n.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.passenger.idType} required>
          <select
            value={passenger.idType ?? idType}
            onChange={(e) => onChange({ idType: e.target.value as IdType })}
            className={inputClass}
          >
            <option value="passport">{t.passenger.idTypePassport}</option>
            <option value="cccd">{t.passenger.idTypeCccd}</option>
          </select>
        </Field>
        <Field label={t.passenger.idNumber} required>
          <input
            type="text"
            value={passenger.idNumber}
            placeholder={passenger.idType === 'cccd' ? t.passenger.idPlaceholderCccd : t.passenger.idPlaceholderPassport}
            onChange={(e) => onChange({ idNumber: e.target.value.trim() })}
            className={inputClass}
            maxLength={40}
          />
        </Field>
      </div>
    </fieldset>
  )
}

const inputClass =
  'w-full h-10 bg-white border border-vg-border-strong rounded-lg px-3 text-sm text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta'

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-vg-text uppercase tracking-wide">
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  )
}
