/**
 * Lightweight VietQR helper — returns the URL of the auto-generated QR
 * image hosted by img.vietqr.io. No API key needed for the basic template.
 *
 * Layout: https://img.vietqr.io/image/<bin>-<account>-<template>.png?...
 */

export type VietQrParams = {
  bankBin: string
  accountNo: string
  accountName: string
  amountVnd: number
  description: string
}

export function vietQrImageUrl(p: VietQrParams): string {
  const params = new URLSearchParams({
    amount: String(Math.max(0, Math.round(p.amountVnd))),
    addInfo: p.description,
    accountName: p.accountName,
  })
  return `https://img.vietqr.io/image/${encodeURIComponent(p.bankBin)}-${encodeURIComponent(p.accountNo)}-compact.png?${params.toString()}`
}
