import weekNumber from './weekNumber';

describe('weekNumber', () => {
  it('returns the week number for a given date', () => {
    expect(weekNumber('2005-01-01')).toEqual(53);
    expect(weekNumber('2005-01-02')).toEqual(53);
    expect(weekNumber('2005-12-31')).toEqual(52);
    expect(weekNumber('2006-01-01')).toEqual(52);
    expect(weekNumber('2006-01-02')).toEqual(1);
    expect(weekNumber('2006-12-31')).toEqual(52);
    expect(weekNumber('2007-01-01')).toEqual(1);
    expect(weekNumber('2007-12-30')).toEqual(52);
    expect(weekNumber('2007-12-31')).toEqual(1);
    expect(weekNumber('2008-01-01')).toEqual(1);
    expect(weekNumber('2008-12-28')).toEqual(52);
    expect(weekNumber('2008-12-29')).toEqual(1);
    expect(weekNumber('2008-12-30')).toEqual(1);
    expect(weekNumber('2008-12-31')).toEqual(1);
    expect(weekNumber('2009-01-01')).toEqual(1);
    expect(weekNumber('2009-12-31')).toEqual(53);
    expect(weekNumber('2010-01-01')).toEqual(53);
    expect(weekNumber('2010-01-02')).toEqual(53);
    expect(weekNumber('2010-01-03')).toEqual(53);
  });
});
