import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReviewDetailsList } from '@packages/lib/types/interfaces';
import Reviewslidercomponents from '@packages/shared-components/common-utilities/slider/reviewslidercomponents';

const mockReviews: ReviewDetailsList['reviewDetail'] = [
  {
      reviewerName: 'John Doe',
      collegeTextKey: "university-of-london",
      comment: 'test review',
      initial: 'JR',
      reviewedDate: 'Reviewed on 11/08/20',
      collegeId: '3467',
      collegeName: 'University of London',
      courseTitle: 'Law LLB',
      overallRating: '4'
  },
  {
    reviewerName: 'John',
    collegeTextKey: "university-of-london",
    comment: 'test review1',
    initial: 'Jw',
    reviewedDate: 'Reviewed on 13/08/20',
    collegeId: '3460',
    collegeName: 'University of London',
    courseTitle: 'Law LLB',
    overallRating: '4'
},
{
    reviewerName: 'Doe',
    collegeTextKey: "university-of-london",
    comment: 'test review',
    initial: 'JE',
    reviewedDate: 'Reviewed on 11/08/20',
    collegeId: '3469',
    collegeName: 'University of London',
    courseTitle: 'Law LLB',
    overallRating: '4'
},
];


// Mock Swiper components
jest.mock('swiper/react', () => ({
    Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
  }));
  jest.mock('swiper/modules', () => ({
    Navigation: jest.fn(),
    Pagination: jest.fn(),
    FreeMode: jest.fn(),
  }));

const emptyReviews: ReviewDetailsList['reviewDetail'] = [];

describe('Reviewslidercomponents', () => {
  
  test('renders the correct number of reviews', () => {
    render(<Reviewslidercomponents reviewData={mockReviews} />);
    
    // Check that the correct number of Reviewscard components are rendered
    const reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards.length).toBe(mockReviews.length);
  });

  test('correctly renders a review', () => {
    render(<Reviewslidercomponents reviewData={mockReviews?.slice(0, 1)} />);
    
    const reviewCard = screen.getByText(mockReviews[0].collegeName);
    expect(reviewCard).toBeInTheDocument();
  });

});
