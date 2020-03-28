const commonSportDetailsKeys = ['league', 'away_team', 'home_team', 'away_period_scores', 'home_period_scores', 'event_information', 'officials']

const commonStatskeys = ['away_totals', 'home_totals']
const nbaStatsKeys = ['home_stats', 'away_stats']
const mlbStatsKeys = ['home_batter_totals', 'away_batter_totals', 'home_fielding', 'away_fielding', 'home_pitchers', 'away_pitchers', 'home_batters', 'away_batters']
const allSportsStatsKeys = [...commonStatskeys, ...nbaStatsKeys, ...mlbStatsKeys]

module.exports = {
    commonSportDetailsKeys,
    allSportsStatsKeys,
}
