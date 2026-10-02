"""
Reduce the full UN Comtrade country report (~190 MB) to the columns/rows that
scripts/process_wwt.py actually reads, so the pipeline can live inside this repository.

    python scripts/extract_comtrade.py <path to Country_Report.csv>

Writes data/raw/comtrade_wwt.csv.gz (kept: value indicators only, the columns below, all years).
Cell text is copied verbatim (dtype=str), so process_wwt.py output is unchanged.
"""
import os
import sys

import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), 'data', 'raw', 'comtrade_wwt.csv.gz')

YEARS = [str(y) for y in range(2010, 2025)]
KEEP = ['Reporter_Code', 'SIDS', 'LDC', 'EU', 'Partner_Code', 'HS_Code', 'Product_Description', 'Indicator'] + YEARS
INDICATORS = ('Import Value (USD)', 'Export Value (USD)')


def main(src):
    df = pd.read_csv(src, encoding='utf-8-sig', dtype=str, usecols=KEEP, low_memory=False)
    reporters = set(df.Reporter_Code)
    df = df[df.Indicator.isin(INDICATORS)][KEEP]
    lost = reporters - set(df.Reporter_Code)
    if lost:
        sys.exit(f'refusing to write: reporters only present in dropped rows (SIDS/LDC/EU flags would be lost): {sorted(lost)}')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    df.to_csv(OUT, index=False, compression={'method': 'gzip', 'compresslevel': 9, 'mtime': 0})
    print(f'{len(df):,} rows -> {OUT} ({os.path.getsize(OUT) / 1e6:.1f} MB)')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
