import {render} from '@testing-library/react';
import {BannerImage} from '@/components';
import 'jest-styled-components';


test('renders BannerImage whith correct styles', () => {
    const {container} = render(<BannerImage />);
    expect(container.firstChild).toHaveStyleRule(
        'background-image',
        'url(/login-image.svg)',
    );
    expect(container.firstChild).toHaveStyleRule(
        'background-size',
        'cover',
    );
    expect(container.firstChild).toHaveStyleRule(
        'height',
        '100vh',
    );
    expect(container.firstChild).toHaveStyleRule(
        'width',
        '50vw',
    );

});