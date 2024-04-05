# Theory

## Monomials

A monomial [to be changed] is an expression consisting of a single term. It is composed of a constant, a variable, or the product of constants and variables raised to non-negative integer exponents.<br>
For Example: A monomial M with m variables,can be expressed as:<br>
 $$M = {x_1}^{i_1}{x_2}^{i_2}{x_3}^{i_3}......{x_m}^{i_m}$$
 where  ${x_1},{x_2},{x_3},......,{x_m}$ are variables,<br>
 &emsp;&emsp;&emsp;${i_1},{i_2},{i_3},......,{i_m}$ are non-negative integer exponents corresponding to each variable.<br>

## Boolean functions

A Boolean function of $m$ variables can be represented by a polynomial of degree $m$ over $\mathbb{F}_2$, $f(x_1, x_2, ... x_m)$, where each variable corresponds to a coefficient of the polynomial. The value of the Boolean function for a particular input assignment is then determined by evaluating the polynomial over $\mathbb{F}_2$ using the given input values.<br>

The number of distinct Boolean functions in $m$ variables is  the number of distinct binary sequences of length $2^m$, which is $2^{2^m}$ . Every function $\textit{f}$ can be represented as a linear combination of monomials:<br>

$$f = {a_0}+{a_1}{x_1} +{a_2}{x_2} +···+{a_m}{x_m} +{a_{12}}{x_1}{x_2} +···+{a_{123...m}}{x_1}{x_2}...{x_m}$$

(Note that for the field $\mathbb{F}_2$, ${x_i}^n = {x_i}$.)

## Evaluation of a Polynomial

Consider the polynomial with $m$ variables over the field $\mathbb{F}_2$. For this polynomial and a bianry vector $\textit{z} = (z_1,z_2,....z_m)$ $\in \mathbb{F}^m_2$, we define: <br> $$Eval_{z}(f) = f(z_1,z_2,....z_m)$$ be the evaluation of $\textit{f}$ at the vector $\textit{z}$.

Next we define<br> $$Eval(f) = (Eval_{z}(f) : z \in \mathbb{F}^m_2)$$
as the evaluation vector of $\textit{f}$ whose coordinates are the evaluations of $\textit{f}$ at all $2^m$ vectors in $\mathbb{F}^m_2$.

## Reed-Muller Codes
Reed-Muller codes are among the oldest and most studied families of codes in coding theory and find applications in various fields like telecommunications, digital data storage, and error-correcting memory.

Reed-Muller (RM) codes are linear block codes that are defined by two non-negative integer parameters. The first parameter, m defines the blocklength of the code (which is $n = 2^m$ ). The second parameter is r, where 0 ≤ r ≤ m, that defines the dimension of the code
$k = \sum_{j=0}^{r}{m \choose j}$. The $\textit{Rate}$ of this code is defined as the ratio $\frac{k}{n} = \frac{k = \sum_{j=0}^{r}{m \choose j}}{2^m}$ which signifies the fraction of the message bits to the number of bits in the codeword.

## Encoding of RM Codes
Typically to encode a message $\boldsymbol{m}$ using a code, the message vector $\boldsymbol{m}$ of length $k$ is multiplied with the generator matrix $G$ to obtain a codeword $\boldsymbol{c}$ of length $n$. Whereas Reed-Muller codes follow a polynomial view encoding approach.<br>
Reed-Muller codes with parameters $m$ and $r$ consist of all the evaluation vectors of polynomials with $m$ variables and degree no larger than $r$. The encoding procedure of RM $(m,r)$ maps the coefficients of the monomials to their corresponding evaluation vectors.