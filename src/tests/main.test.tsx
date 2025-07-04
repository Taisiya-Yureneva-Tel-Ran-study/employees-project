import { it, expect, describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test('render with screen', () => {
    render(<div role='code'>Hello</div>)
    screen.debug();
    expect(screen.getByRole('code')).toBeInTheDocument();
})

