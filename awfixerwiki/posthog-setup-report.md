# PostHog post-wizard report

The wizard has completed a deep integration of your Next.js documentation site (AWFixer Wiki). PostHog is now configured to track user interactions across your documentation, providing insights into search behavior, content engagement, navigation patterns, and potential churn indicators.

## Integration Summary

The integration uses the modern `instrumentation-client.ts` approach recommended for Next.js 15.3+, which provides optimal performance and reliability. Key changes include:

1. **Client-side initialization** via `instrumentation-client.ts` - PostHog initializes automatically on page load
2. **Environment variables** configured in `.env` with `NEXT_PUBLIC_POSTHOG_API_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
3. **Automatic pageview tracking** using `capture_pageview: 'history_change'` for SPA navigation
4. **Error tracking** enabled with `capture_exceptions: true`
5. **Privacy-respecting** configuration with `respect_dnt: true`

## Events Implemented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `search_opened` | User opens the search modal to search documentation | `src/components/Search/OpenModalButton.tsx` |
| `search_performed` | User performs a search query in the documentation | `src/hooks/useDebouncedSearch.ts` |
| `search_result_clicked` | User clicks on a search result to navigate to documentation | `src/components/Search/Results.tsx` |
| `code_copied` | User copies code from a code block | `src/hooks/useCopy.ts` |
| `theme_toggled` | User toggles between light and dark theme | `src/components/ThemeSwitcher.tsx` |
| `external_link_clicked` | User clicks an external link (GitHub, Discord, etc.) | `src/components/Link.tsx` |
| `sidebar_navigation` | User navigates using the sidebar menu | `src/components/SidebarItem.tsx` |
| `not_found_page_viewed` | User lands on a 404 page (potential churn indicator) | `src/pages/404.tsx` |
| `tally_form_opened` | User opens a Tally feedback form | `src/components/TallyButton.tsx` |

## Files Modified

- `instrumentation-client.ts` - Created (PostHog client initialization)
- `.env` - Created (environment variables)
- `src/hooks/usePostHog.ts` - Updated (simplified for new initialization pattern)
- `src/pages/_app.tsx` - Updated (removed old initialization)
- `src/components/Search/OpenModalButton.tsx` - Updated (search tracking)
- `src/hooks/useDebouncedSearch.ts` - Updated (search tracking)
- `src/components/Search/Results.tsx` - Updated (result click tracking)
- `src/hooks/useCopy.ts` - Updated (code copy tracking)
- `src/components/ThemeSwitcher.tsx` - Updated (theme toggle tracking)
- `src/components/Link.tsx` - Updated (external link tracking)
- `src/components/SidebarItem.tsx` - Updated (navigation tracking)
- `src/pages/404.tsx` - Updated (404 page tracking)
- `src/components/TallyButton.tsx` - Updated (form tracking)

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- **Analytics basics**: [https://us.posthog.com/project/284108/dashboard/1020907](https://us.posthog.com/project/284108/dashboard/1020907)

### Insights
- **Search Funnel - Opened to Clicked**: [https://us.posthog.com/project/284108/insights/LOoJHvoj](https://us.posthog.com/project/284108/insights/LOoJHvoj) - Conversion funnel from opening search to clicking a result
- **Code Copied Events**: [https://us.posthog.com/project/284108/insights/YActcTq9](https://us.posthog.com/project/284108/insights/YActcTq9) - Tracks how often users copy code snippets
- **404 Page Views (Churn Indicator)**: [https://us.posthog.com/project/284108/insights/XcyQtwBp](https://us.posthog.com/project/284108/insights/XcyQtwBp) - Tracks visits to 404 pages
- **Theme Toggle Usage**: [https://us.posthog.com/project/284108/insights/uAlFxb1q](https://us.posthog.com/project/284108/insights/uAlFxb1q) - Tracks theme preference changes
- **External Link Clicks by Domain**: [https://us.posthog.com/project/284108/insights/NWONGgMB](https://us.posthog.com/project/284108/insights/NWONGgMB) - Shows which external resources users visit most

## Configuration Details

```
NEXT_PUBLIC_POSTHOG_API_KEY=phc_osdVkXUjY7vGEalPD5cDfGxitJjoWBWL64x5S0VOfK8
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

These environment variables are configured in your `.env` file and should also be added to your hosting provider (Vercel, Netlify, etc.).
