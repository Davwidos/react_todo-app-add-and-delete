import classNames from 'classnames';
import { FC, useCallback, useEffect } from 'react';
import { useTimeout } from '../../hooks/useTimeout';
import { errors, useTodos } from '../../providers';

export const ErrorNotification: FC = () => {
  const { error, setError } = useTodos();

  const handleClose = useCallback(() => setError(null), [setError]);

  const [startHideTimeout] = useTimeout(handleClose, 3000);

  useEffect(() => {
    if (error) {
      startHideTimeout();
    }
  }, [error, startHideTimeout]);
  const message = error ? errors[error].message : '';

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClose}
      />
      {message}
    </div>
  );
};
