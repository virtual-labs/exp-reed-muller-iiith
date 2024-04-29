# Theory

## Monomials

A monomial is an expression consisting of a single term. It is composed of a constant, a variable, or the product of constants and variables raised to non-negative integer exponents.
For Example: A monomial M with m variables,can be expressed as:
 $$M = {x_1}^{i_1}{x_2}^{i_2}{x_3}^{i_3}......{x_m}^{i_m}$$
 where  ${x_1},{x_2},{x_3},......,{x_m}$ are variables, $\newline$
 $\hspace{0.8cm}$ ${i_1},{i_2},{i_3},......,{i_m}$ are non-negative integer exponents corresponding to each variable. $\newline$

 Example : $ (x_1^1x_2^3x_3^7), (x_7^4x_9^9x_{12}^2) $

## Boolean functions

A Boolean function of $m$ variables can be represented by a polynomial of degree $m$ over $\mathbb{F}_2$, $f(x_1, x_2, ... x_m)$, where each variable corresponds to a coefficient of the polynomial. The value of the Boolean function for a particular input assignment is then determined by evaluating the polynomial over $\mathbb{F}_2$ using the given input values. $\newline$

The number of distinct Boolean functions in $m$ variables is  the number of distinct binary sequences of length $2^m$, which is $2^{2^m}$ . Every function $\textit{f}$ can be represented as a linear combination of monomials: $\newline$

$$f = {a_0}+{a_1}{x_1} +{a_2}{x_2} +···+{a_m}{x_m} +{a_{12}}{x_1}{x_2} +···+{a_{123...m}}{x_1}{x_2}...{x_m}$$

(Note that for the field $\mathbb{F}_2$, ${x_i}^n = {x_i}$ and ${a_i}^n = {a_i}$)

Example : $ f = x_1 + x_2x_4 + x_7 + x_3x_{11}$ $\newline$ 
$\hspace{1.15cm}$: $ f = x_2 + x_3x_4x_7x_9 + x_5$

## Evaluation of a Polynomial

Consider the polynomial with $m$ variables over the field $\mathbb{F}_2$. For this polynomial and a binary vector $\textit{z} = (z_1,z_2,....z_m)$ $\in \mathbb{F}^m_2$, we define: $\newline$ $$Eval_{z}(f) = f(z_1,z_2,....z_m)$$ be the evaluation of $\textit{f}$ at the vector $\textit{z}$.

Next we define $\newline$ $$Eval(f) = (Eval_{z}(f) : z \in \mathbb{F}^m_2)$$
as the evaluation vector of $\textit{f}$ whose coordinates are the evaluations of $\textit{f}$ at all $2^m$ vectors in $\mathbb{F}^m_2$.

Example : Evaluation of $ x_1 + x_2x_3 + x_3$ over $\mathbb{F}^3_2$ over all $2^m$ results in $ 01001011 $

## Reed-Muller Codes
Reed-Muller codes are among the oldest and most studied families of codes in coding theory and find applications in various fields like telecommunications, digital data storage, and error-correcting memory.

Reed-Muller (RM) codes are linear block codes that are defined by two non-negative integer parameters. The first parameter, m defines the blocklength of the code (which is $n = 2^m$ ). The second parameter is r, where 0 ≤ r ≤ m, that defines the dimension of the code
$k = \sum_{j=0}^{r}{m \choose j}$. The $\textit{Rate}$ of this code is defined as the ratio $\frac{k}{n} = \frac{k = \sum_{j=0}^{r}{m \choose j}}{2^m}$ which signifies the fraction of the message bits to the number of bits in the codeword. Reed_muller codes are also denoted by RM(m,r). 

## Encoding of RM Codes
Typically to encode a message $\boldsymbol{m}$ using a code, the message vector $\boldsymbol{m}$ of length $k$ is multiplied with the generator matrix $G$ to obtain a codeword $\boldsymbol{c}$ of length $n$. Whereas Reed-Muller codes follow a polynomial view encoding approach. $\newline$
Reed-Muller codes with parameters $m$ and $r$ consist of all the evaluation vectors of polynomials with $m$ variables and degree no larger than $r$. The encoding procedure of RM $(m,r)$ maps the coefficients of the monomials to their corresponding evaluation vectors.

The set of message polynomials for $RM(m,r)$ codes is defined as: $\newline$

$$ \textit{M} = {M(X_{1}, X_{2}, X_{3}, ..... ,X_{m}) = \sum_{(i_{1},....,i_{m}) \in \{0,1\}^m : \sum_{j=1}^{m}, i_{j} \le r} a_{i_{1}.....i_{m}} X_{1}^{i_{1}}X_{2}^{i_{2}}......X_{m}^{i_{m}} : a_{i_{1}.....i_{m}} \in \mathbb{F}_2 }$$

$RM(m,r)$ code is defined as codeword corresponding to message polynomial $ M(X_{1}, X_{2}, X_{3}, ..... ,X_{m}) = (M(X_{1}, X_{2}, X_{3}, ..... ,X_{m})|_{(X_{1}......X{m}) \in \mathbb{F}^{m}_2}) $ and is of length $ 2^{m} = n $ (Coordinates of the codeword are indexed by the vector from $ \mathbb{F}^{m}_2 $)

$$ RM(m,r) code = \{M(X_{1}, X_{2}, X_{3}, ..... ,X_{m})|_{(X_{1}......X{m}) \in \mathbb{F}^{m}_2} : M(X_{1}, X_{2}, X_{3}, ..... ,X_{m}) \in \textit{M}\} $$

Example : $ RM (m = 4, r = 2)$ $\newline$
 $ \textit{M} = \{M(X_{1}, X_{2}, X_{3}, ..... ,X_{m}) = a_{1100}X_{1}X_{2} + a_{1010}X_{1}X_{3} + a_{1001}X_{1}X_{4} + a_{0110}X_{2}X_{3} + a_{0101}X_{2}X_{4} + a_{0011}X_{3}X_{4} + a_{1000}X_{1} + a_{0100}X_{2} + a_{0010}X_{3} + a_{0001}X_{4} + a_{0000} : a_{i_{1}i_{2}i_{3}i_{4}} \in \mathbb{F}_2\} $

 Message polynomial = $ X_{1}X_{2} + X_{3}$ $\newline$
 Codeword corresponding to this message polynomial = $ (0_{X_{1}X_{2}X_{3}X_{4} = 0000}, 0_{0001}, 1_{0010}, 1,0,0,1,1,0,0,1,1,1,1,0,0) $

## Generator Matrix of RM Codes
The generator matrix $(G_{RM})$ of Reed-Muller codes are formed by it's evaluation vectors.
$$ G_{RM} =  \{ Eval(X_{i}) : i \subseteq [m], |i| \le r \} $$

Example : Generator matrix of $RM(4,2)$ $\newline$
$ G_{RM} =  \{Eval(X_{1}X_{2}), Eval(X_{1}X_{3}), Eval(X_{1}X_{4}), Eval(X_{2}X_{3}), Eval(X_{2}X_{4}), Eval(X_{3}X_{4}),  Eval(X_{1}), Eval(X_{2}), Eval(X_{3}), Eval(X_{4}), Eval(1)\} $

$ G_{RM} = $

$$ \[ 
\begin{bmatrix}
$Eval(X_{1}X_{2})$ \\
$Eval(X_{1}X_{3})$ \\
$Eval(X_{1}X_{4})$ \\
$Eval(X_{2}X_{3})$ \\
$Eval(X_{2}X_{4})$ \\
$Eval(X_{3}X_{4})$ \\
$Eval(X_{1})$ \\
$Eval(X_{2})$ \\
$Eval(X_{3})$ \\
$Eval(X_{4})$ \\
$Eval(1)$ 
\end{bmatrix}

\begin{bmatrix}
0&0&0&1&0&0&0&1&0&0&0&1&0&0&0&1 \\
0&0&0&0&0&1&0&1&0&0&0&0&0&1&0&1 \\
0&0&0&0&0&0&0&0&0&1&0&1&0&1&0&1 \\
0&0&0&0&0&0&1&1&0&0&0&0&0&0&1&1 \\
0&0&0&0&0&0&0&0&0&0&1&1&0&0&1&1 \\
0&0&0&0&0&0&0&0&0&0&1&1&0&0&1&1 \\
0&0&0&0&0&0&0&0&0&0&0&0&1&1&1&1 \\
0&1&0&1&0&1&0&1&0&1&0&1&0&1&0&1 \\
0&0&1&1&0&0&1&1&0&0&1&1&0&0&1&1 \\
0&0&0&0&1&1&1&1&0&0&0&0&1&1&1&1 \\
0&0&0&0&0&0&0&0&1&1&1&1&1&1&1&1 \\
\end{bmatrix}

\]$$


## Parity Check Matrix of RM Codes

## Minimum Distance of RM codes